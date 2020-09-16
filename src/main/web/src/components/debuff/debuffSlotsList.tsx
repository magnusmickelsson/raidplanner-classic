import { List } from "@material-ui/core"
import React from "react"
import { numDebuffSlots } from "../../constants/wow"
import { Debuff } from "../../types/api"
import DebuffSlotItem from "./debuffSlotItem"

interface DebuffSlotsListProps {
  debuffSlots: Debuff[] | undefined[]
}

const DebuffSlotsList: React.FC<DebuffSlotsListProps> = ({ debuffSlots }) => {
  const debuffRows = []

  for (let i = 0; i < numDebuffSlots; i++) {
    debuffRows.push(
      <DebuffSlotItem key={i} index={i} debuff={debuffSlots[i]} />,
    )
  }

  return (
    <List dense disablePadding>
      {debuffRows}
    </List>
  )
}

export default DebuffSlotsList
