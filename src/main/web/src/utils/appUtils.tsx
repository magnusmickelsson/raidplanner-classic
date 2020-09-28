import { partySize } from "../constants/wow"
import { ClassSpec, Debuff, DebuffItem } from "../types/api"
import { SpecsByClasses, GridValue } from "../types/app"

export function populateGrid(numParties: number): ClassSpec[][] {
  const grid = Array(numParties)
  for (let i = 0; i < numParties; i++) {
    grid[i] = Array.from(Array(partySize), () => undefined)
  }

  return grid
}

export function findInGrid(
  grid: ClassSpec[][],
  numParties: number,
  value: string,
): GridValue | undefined {
  for (let i = 0; i < numParties; i++) {
    const j = grid[i].findIndex(item => item.specName === value)

    if (j !== -1) return { x: i, y: j, value: grid[i][j] }
  }

  return undefined
}

export function getDebuffsFromGrid(
  grid: ClassSpec[][] | undefined[][],
  specs: ClassSpec[],
  numParties: number,
): string[] {
  let uniqueSpecs: ClassSpec[] = []
  let uniqueDebuffs: string[] = []
  for (let i = 0; i < numParties; i++) {
    const specsInParty = (grid[i] as ClassSpec[]).filter(
      (item: ClassSpec | undefined): item is ClassSpec => !!item,
    )
    uniqueSpecs = [...new Set([...uniqueSpecs, ...specsInParty])]
  }

  uniqueSpecs.forEach(item => {
    const fullSpec = specs.find(spec => spec.specName === item.specName)

    if (fullSpec !== undefined) {
      const specDebuffs = fullSpec.canApplyDebuff.map(item => item.name)
      uniqueDebuffs = [...new Set([...uniqueDebuffs, ...specDebuffs])]
    }
  })

  return uniqueDebuffs
}

export function getDebuffsFromItems(items: DebuffItem[]): Debuff[] {
  let debuffs: Debuff[] = []

  items.forEach(item => {
    debuffs = [...new Set([...debuffs, ...item.effect])]
  })

  return debuffs
}

export function specsByClasses(specs: ClassSpec[]): SpecsByClasses {
  const specsByClasses: SpecsByClasses = {}

  specs.forEach(spec => {
    if (specsByClasses[spec.className])
      specsByClasses[spec.className].push(spec)
    else specsByClasses[spec.className] = [spec]
  })

  return specsByClasses
}
