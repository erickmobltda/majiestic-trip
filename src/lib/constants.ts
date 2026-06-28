export interface MileageProgramOption {
  label: string
  airline: string
  seatsaeroSource: string
}

// seats.aero "source" codes — verified against the Partner API. Codes that the
// API rejects (e.g. British Airways, Southwest, ANA) are intentionally omitted;
// seats.aero does not track them.
export const MILEAGE_PROGRAMS_LIST: MileageProgramOption[] = [
  { label: 'United MileagePlus', airline: 'UA', seatsaeroSource: 'united' },
  { label: 'Delta SkyMiles', airline: 'DL', seatsaeroSource: 'delta' },
  { label: 'American AAdvantage', airline: 'AA', seatsaeroSource: 'american' },
  { label: 'Alaska Mileage Plan', airline: 'AS', seatsaeroSource: 'alaska' },
  { label: 'JetBlue TrueBlue', airline: 'B6', seatsaeroSource: 'jetblue' },
  { label: 'Air Canada Aeroplan', airline: 'AC', seatsaeroSource: 'aeroplan' },
  { label: 'Air France/KLM Flying Blue', airline: 'AF', seatsaeroSource: 'flyingblue' },
  { label: 'Avianca LifeMiles', airline: 'AV', seatsaeroSource: 'lifemiles' },
  { label: 'Virgin Atlantic Flying Club', airline: 'VS', seatsaeroSource: 'virginatlantic' },
  { label: 'Virgin Australia Velocity', airline: 'VA', seatsaeroSource: 'velocity' },
  { label: 'Emirates Skywards', airline: 'EK', seatsaeroSource: 'emirates' },
  { label: 'Etihad Guest', airline: 'EY', seatsaeroSource: 'etihad' },
  { label: 'Qatar Privilege Club', airline: 'QR', seatsaeroSource: 'qatar' },
  { label: 'Saudia AlFursan', airline: 'SV', seatsaeroSource: 'saudia' },
  { label: 'Singapore KrisFlyer', airline: 'SQ', seatsaeroSource: 'singapore' },
  { label: 'Turkish Miles&Smiles', airline: 'TK', seatsaeroSource: 'turkish' },
  { label: 'Qantas Frequent Flyer', airline: 'QF', seatsaeroSource: 'qantas' },
  { label: 'Lufthansa Miles & More', airline: 'LH', seatsaeroSource: 'lufthansa' },
  { label: 'Iberia Plus', airline: 'IB', seatsaeroSource: 'iberia' },
  { label: 'Finnair Plus', airline: 'AY', seatsaeroSource: 'finnair' },
  { label: 'SAS EuroBonus', airline: 'SK', seatsaeroSource: 'eurobonus' },
  { label: 'Aeromexico Club Premier', airline: 'AM', seatsaeroSource: 'aeromexico' },
  { label: 'Copa ConnectMiles', airline: 'CM', seatsaeroSource: 'copa' },
  { label: 'GOL Smiles', airline: 'G3', seatsaeroSource: 'smiles' },
  { label: 'Azul TudoAzul', airline: 'AD', seatsaeroSource: 'azul' },
]

export const CENTS_PER_MILE: Record<string, number> = {
  united: 1.35,
  delta: 1.2,
  american: 1.5,
  alaska: 1.8,
  jetblue: 1.3,
  aeroplan: 1.7,
  flyingblue: 1.3,
  lifemiles: 1.5,
  virginatlantic: 1.5,
  velocity: 1.2,
  emirates: 1.2,
  etihad: 1.3,
  qatar: 1.3,
  saudia: 1.1,
  singapore: 1.7,
  turkish: 1.4,
  qantas: 1.4,
  lufthansa: 1.4,
  iberia: 1.3,
  finnair: 1.3,
  eurobonus: 1.3,
  aeromexico: 1.2,
  copa: 1.4,
  smiles: 1.1,
  azul: 1.0,
}

export const TRIP_STATUS_LABELS: Record<string, string> = {
  planning: 'Planning',
  booked: 'Booked',
  completed: 'Completed',
}

export const CABIN_LABELS: Record<string, string> = {
  economy: 'Economy',
  premium: 'Premium Economy',
  business: 'Business',
  first: 'First Class',
}

// Maps a seats.aero source code to its display label (falls back to the code).
export function programLabel(source: string): string {
  return MILEAGE_PROGRAMS_LIST.find((p) => p.seatsaeroSource === source)?.label ?? source
}
