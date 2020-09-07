export interface Debuff {
  name: string
  effectType: any
  overwrites: boolean
}

export interface ClassSpecType {
  specName: string
  className: any
  canApplyDebuff: Debuff[]
}
