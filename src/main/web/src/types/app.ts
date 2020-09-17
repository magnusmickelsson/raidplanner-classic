import { ClassSpec, Debuff } from "./api"

export const ItemTypes = {
  SPEC: "spec",
  DEBUFF: "debuff",
}

export interface SpecDragItemType {
  type: string
  value: ClassSpec
  prevGridValue: GridValue
  color: string
}

export interface DebuffDragItemType {
  type: string
  value: Debuff
  prevDebuffListVal: DebuffListValue
}

export interface SpecsByClasses {
  [key: string]: ClassSpec[]
}

export interface GridValue {
  x: number
  y: number
  value: ClassSpec | undefined
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
