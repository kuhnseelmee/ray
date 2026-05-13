export interface ACCROIData {
  participants: number
  hourlyRate: number
  adminHours: number
  missedShifts: number
  incidents: number
}

export interface ACCROIReturn {
  totalSavings: number
  accCost: number
  netGain: number
}

export function calculateACCROI(data: ACCROIData): ACCROIReturn {
  const {
    participants,
    hourlyRate,
    adminHours,
    missedShifts,
    incidents,
  } = data

  const adminCost = adminHours * hourlyRate * 4.3
  const adminSavings = adminCost * 0.3

  const missedShiftLoss = missedShifts * 120
  const missedShiftSavings = missedShiftLoss * 0.4

  const incidentLoss = incidents * 300
  const incidentSavings = incidentLoss * 0.35

  let riskBase = 2000
  if (participants >= 30 && participants < 80) riskBase = 5000
  if (participants >= 80) riskBase = 10000

  const riskSavings = riskBase * 0.5

  const totalSavings = adminSavings + missedShiftSavings + incidentSavings + riskSavings
  const accCost = participants * 52
  const netGain = totalSavings - accCost

  return {
    totalSavings,
    accCost,
    netGain,
  }
}
