import React from "react"
import { ClassSpecType } from "../../types/api"
import SpecItem from "./specItem"
import List from "@material-ui/core/List"

interface SpecsListProps {
  specs: ClassSpecType[]
}

const SpecsList: React.FC<SpecsListProps> = ({ specs }) => {
  const specsRows = specs.map((spec, i) => <SpecItem key={i} spec={spec} />)

  return <List dense>{specsRows}</List>
}

export default SpecsList
