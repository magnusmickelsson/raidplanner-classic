// TODO: Fix effectType type checking here, do not use "any"

export interface Debuff {
  name: string
  effectType: any
  overwrites: boolean
}

export interface ClassSpec {
  specName: string
  className: any
  canApplyDebuff: Debuff[]
}

export interface DebuffItem {
  name: string
  effect: Debuff[]
}
