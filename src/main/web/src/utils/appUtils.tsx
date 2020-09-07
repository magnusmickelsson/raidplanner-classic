import { partySize } from "../constants/wow"
import { ClassSpecType, Debuff } from "../types/api"
import { SpecsByClasses, GridValue } from "../types/app"

export function populateGrid(numParties: number): string[][] {
  const grid = Array(numParties)
  for (let i = 0; i < numParties; i++) {
    grid[i] = Array.from(Array(partySize), () => undefined)
  }

  return grid
}

export function findInGrid(
  grid: string[][],
  numParties: number,
  value: string,
): GridValue | undefined {
  for (let i = 0; i < numParties; i++) {
    const j = grid[i].findIndex(item => item === value)

    if (j !== -1) return { x: i, y: j, value: grid[i][j] }
  }

  return undefined
}

export function getDebuffsFromGrid(
  grid: string[][],
  specs: ClassSpecType[],
  numParties: number,
): string[] {
  let uniqueSpecs: string[] = []
  let uniqueDebuffs: string[] = []
  for (let i = 0; i < numParties; i++) {
    const specsInParty = grid[i].filter(item => item !== undefined)
    uniqueSpecs = [...new Set([...uniqueSpecs, ...specsInParty])]
  }

  uniqueSpecs.forEach(item => {
    const specObj = specs.find(spec => spec.specName === item)

    if (specObj) {
      const specDebuffs = specObj.canApplyDebuff.map(item => item.name)
      uniqueDebuffs = [...new Set([...uniqueDebuffs, ...specDebuffs])]
    }
  })

  return uniqueDebuffs
}

export function specsByClasses(specs: ClassSpecType[]): SpecsByClasses {
  const specsByClasses: SpecsByClasses = {}

  specs.forEach(spec => {
    if (specsByClasses[spec.className])
      specsByClasses[spec.className].push(spec)
    else specsByClasses[spec.className] = [spec]
  })

  return specsByClasses
}
