// Majiestic Trip API proxy (Cloudflare Worker)
//
// Why this exists: SerpApi (google_flights) and seats.aero are server-only APIs
// that send no CORS headers, so the browser cannot call them directly. This
// Worker holds the API keys as secrets and proxies the calls, adding CORS
// headers for the site's origin. The frontend calls this Worker, never the
// upstream APIs directly — which also keeps the keys out of the public bundle.

export interface Env {
  SERPAPI_KEY: string
  SEATSAERO_KEY: string
  ALLOWED_ORIGINS?: string
}

const DEFAULT_ALLOWED = [
  'https://erickmobltda.github.io',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5180',
  'http://localhost:5181',
]

function allowedOrigins(env: Env): string[] {
  return env.ALLOWED_ORIGINS
    ? env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
    : DEFAULT_ALLOWED
}

function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get('Origin') ?? ''
  const allow = allowedOrigins(env).includes(origin) ? origin : allowedOrigins(env)[0]
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  }
}

function json(body: unknown, status: number, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  })
}

// GET /api/flights/cash — proxies SerpApi google_flights
async function handleCash(url: URL, env: Env, cors: Record<string, string>): Promise<Response> {
  if (!env.SERPAPI_KEY) return json({ error: 'SERPAPI_KEY not configured' }, 500, cors)

  const upstream = new URL('https://serpapi.com/search')
  upstream.searchParams.set('engine', 'google_flights')
  upstream.searchParams.set('api_key', env.SERPAPI_KEY)
  // pass through the flight params the client provided
  for (const key of ['departure_id', 'arrival_id', 'outbound_date', 'return_date', 'type', 'adults', 'children']) {
    const v = url.searchParams.get(key)
    if (v) upstream.searchParams.set(key, v)
  }
  upstream.searchParams.set('currency', url.searchParams.get('currency') ?? 'USD')

  const res = await fetch(upstream.toString())
  const data = await res.json()
  return json(data, res.ok ? 200 : res.status, cors)
}

// GET /api/flights/award — proxies seats.aero cached search
async function handleAward(url: URL, env: Env, cors: Record<string, string>): Promise<Response> {
  if (!env.SEATSAERO_KEY) return json({ error: 'SEATSAERO_KEY not configured' }, 500, cors)

  const origin = url.searchParams.get('origin_airport')
  const destination = url.searchParams.get('destination_airport')
  const date = url.searchParams.get('departure_date')
  const source = url.searchParams.get('source')
  if (!origin || !destination || !date || !source) {
    return json({ error: 'origin_airport, destination_airport, departure_date and source are required' }, 400, cors)
  }

  const upstream = new URL('https://seats.aero/partnerapi/search')
  upstream.searchParams.set('origin_airport', origin)
  upstream.searchParams.set('destination_airport', destination)
  upstream.searchParams.set('start_date', date)
  upstream.searchParams.set('end_date', date)
  upstream.searchParams.set('sources', source)
  upstream.searchParams.set('take', '50')

  const res = await fetch(upstream.toString(), {
    headers: { 'Partner-Authorization': env.SEATSAERO_KEY, accept: 'application/json' },
  })
  const data = await res.json()
  return json(data, res.ok ? 200 : res.status, cors)
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const cors = corsHeaders(request, env)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors })
    }
    if (request.method !== 'GET') {
      return json({ error: 'Method not allowed' }, 405, cors)
    }

    const url = new URL(request.url)
    try {
      if (url.pathname === '/api/flights/cash') return await handleCash(url, env, cors)
      if (url.pathname === '/api/flights/award') return await handleAward(url, env, cors)
      if (url.pathname === '/' || url.pathname === '/health') {
        return json({ ok: true, service: 'majiestic-trip-proxy' }, 200, cors)
      }
      return json({ error: 'Not found' }, 404, cors)
    } catch (err) {
      return json({ error: err instanceof Error ? err.message : 'Proxy error' }, 502, cors)
    }
  },
}
