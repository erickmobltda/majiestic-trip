export interface MileageProgram {
  id: string
  programName: string
  airline: string
  seatsaeroSource: string
  currentMiles: number
  memberNumber?: string
  tier?: string
  updatedAt: Date
}
