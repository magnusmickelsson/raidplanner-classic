import React from "react"
import { Debuff } from "../../types/api"
import DebuffItem from "./debuffItem"
import List from "@material-ui/core/List"

interface DebuffListProps {
  debuffs: Debuff[]
  activeDebuffs: string[]
  debuffSlots: Debuff[] | undefined[]
}

const DebuffList: React.FC<DebuffListProps> = ({
  debuffs,
  activeDebuffs,
  debuffSlots,
}) => {
  const debuffRows = debuffs.map((debuff, i) => (
    <DebuffItem
      key={i}
      activated={activeDebuffs.indexOf(debuff.name) !== -1}
      slotted={
        debuffSlots
          ? (debuffSlots as Debuff[]).find(
              (item: Debuff | undefined): item is Debuff =>
                !!item && item.name === debuff.name,
            ) !== undefined
          : false
      }
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
