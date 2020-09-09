import React from "react"
import { ClassSpecType } from "../../types/api"
import SpecItem from "./specItem"
import List from "@material-ui/core/List"
import { colorByClass } from "../../constants/wow"

interface SpecsListProps {
  wowClass: string
  specs: ClassSpecType[]
}

const SpecsList: React.FC<SpecsListProps> = ({ wowClass, specs }) => {
  const color = colorByClass[wowClass]
  const specsRows = specs.map((spec, i) => (
    <SpecItem key={i} spec={spec} color={color} />
  ))

  return (
    <List dense disablePadding>
      {specsRows}
    </List>
  )
}

export default SpecsList
