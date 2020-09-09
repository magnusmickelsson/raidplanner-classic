import { ClassSpecType } from "./api"

export const ItemTypes = {
  SPEC: "spec",
}

export interface SpecDragItemType {
  type: string
  value: string
  prevGridValue: GridValue
  color: string
}

export interface SpecsByClasses {
  [key: string]: ClassSpecType[]
}

export interface GridValue {
  x: number
  y: number
  value: string
}
