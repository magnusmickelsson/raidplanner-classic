import { ClassSpecType } from "./api"

export const ItemTypes = {
  SPEC: "spec",
}

export interface SpecDragItemType {
  type: string
  value: ClassSpecType
  prevGridValue: GridValue
  color: string
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
