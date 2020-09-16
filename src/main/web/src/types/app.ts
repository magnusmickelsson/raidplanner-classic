import { ClassSpecType, Debuff } from "./api"

export const ItemTypes = {
  SPEC: "spec",
  DEBUFF: "debuff",
}

export interface SpecDragItemType {
  type: string
  value: ClassSpecType
  prevGridValue: GridValue
  color: string
}

export interface DebuffDragItemType {
  type: string
  value: Debuff
  prevDebuffListVal: DebuffListValue
}

export interface SpecsByClasses {
  [key: string]: ClassSpecType[]
}

export interface GridValue {
  x: number
  y: number
  value: ClassSpecType | undefined
}

export interface GridAction {
  prev_x: number | undefined
  prev_y: number | undefined
  gridValue: GridValue
}

export interface DebuffListValue {
  i: number
  value: Debuff | undefined
}

export interface DebuffSlotAction {
  i: number
  prev_i: number | undefined
  value: Debuff | undefined
}
