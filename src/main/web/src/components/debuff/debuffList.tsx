import React from "react"
import { Debuff } from "../../types/api"
import DebuffItem from "./debuffItem"
import List from "@material-ui/core/List"

interface DebuffListProps {
  debuffs: Debuff[]
  activeDebuffs: string[]
}

const DebuffList: React.FC<DebuffListProps> = ({ debuffs, activeDebuffs }) => {
  const debuffRows = debuffs.map((debuff, i) => (
    <DebuffItem
      key={i}
      activated={activeDebuffs.indexOf(debuff.name) !== -1}
      debuff={debuff}
    />
  ))

  return (
    <List dense disablePadding>
      {debuffRows}
    </List>
  )
}

export default DebuffList
