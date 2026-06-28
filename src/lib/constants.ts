export interface MileageProgramOption {
  label: string
  airline: string
  seatsaeroSource: string
}

export const MILEAGE_PROGRAMS_LIST: MileageProgramOption[] = [
  { label: 'United MileagePlus', airline: 'UA', seatsaeroSource: 'united' },
  { label: 'Delta SkyMiles', airline: 'DL', seatsaeroSource: 'delta' },
  { label: 'American AAdvantage', airline: 'AA', seatsaeroSource: 'american' },
  { label: 'Alaska Mileage Plan', airline: 'AS', seatsaeroSource: 'alaska' },
  { label: 'Southwest Rapid Rewards', airline: 'WN', seatsaeroSource: 'southwest' },
  { label: 'JetBlue TrueBlue', airline: 'B6', seatsaeroSource: 'jetblue' },
  { label: 'Air Canada Aeroplan', airline: 'AC', seatsaeroSource: 'aeroplan' },
  { label: 'British Airways Executive Club', airline: 'BA', seatsaeroSource: 'ba' },
  { label: 'Emirates Skywards', airline: 'EK', seatsaeroSource: 'emirates' },
  { label: 'Air France/KLM Flying Blue', airline: 'AF', seatsaeroSource: 'flyingblue' },
  { label: 'Singapore Airlines KrisFlyer', airline: 'SQ', seatsaeroSource: 'singapore' },
  { label: 'Avianca LifeMiles', airline: 'AV', seatsaeroSource: 'avianca' },
  { label: 'Turkish Airlines Miles&Smiles', airline: 'TK', seatsaeroSource: 'turkish' },
  { label: 'Qantas Frequent Flyer', airline: 'QF', seatsaeroSource: 'qantas' },
  { label: 'Virgin Atlantic Flying Club', airline: 'VS', seatsaeroSource: 'virgin_atlantic' },
]

export const CENTS_PER_MILE: Record<string, number> = {
  united: 1.35,
  delta: 1.2,
  american: 1.5,
  alaska: 1.8,
  southwest: 1.5,
  jetblue: 1.3,
  aeroplan: 1.7,
  ba: 1.6,
  emirates: 1.2,
  flyingblue: 1.3,
  singapore: 1.7,
  avianca: 1.5,
  turkish: 1.4,
  qantas: 1.4,
  virgin_atlantic: 1.5,
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
