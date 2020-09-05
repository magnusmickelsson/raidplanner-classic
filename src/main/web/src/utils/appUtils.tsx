import { partySize } from "../constants/wow"
import { ClassSpecType } from "../types/api"
import { SpecsByClasses } from "../types/app"

export function populateGrid(numParties: number): string[][] {
  const grid = Array(numParties)
  for (let i = 0; i < numParties; i++) {
    grid[i] = Array.from(Array(partySize), (_, i) => i + 1)
  }

  return grid
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
