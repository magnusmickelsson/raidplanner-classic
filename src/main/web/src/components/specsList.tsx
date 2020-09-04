import React from "react"
import { ClassSpecType } from "../types/api"
import Spec from "./spec"
import List from "@material-ui/core/List"

interface SpecsListProps {
  specs: ClassSpecType[]
}

const SpecsList: React.FC<SpecsListProps> = ({ specs }) => {
  const specsRows = specs.map((spec, i) => <Spec key={i} spec={spec} />)

  return (
    <List component="nav" style={{ maxWidth: 256, marginTop: 12 }}>
      {specsRows}
    </List>
  )
}

export default SpecsList
