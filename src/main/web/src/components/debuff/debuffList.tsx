import React from "react"
import { Debuff } from "../../types/api"
import DebuffItem from "./debuffItem"
import List from "@material-ui/core/List"
import { Box } from "@material-ui/core"

interface DebuffListProps {
  debuffs: Debuff[]
  activeDebuffs: string[]
  debuffSlots: Debuff[] | undefined[]
  itemDebuffs: Debuff[]
}

const DebuffList: React.FC<DebuffListProps> = ({
  debuffs,
  activeDebuffs,
  debuffSlots,
  itemDebuffs,
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

  const itemDebuffRows = itemDebuffs.map((debuff, i) => (
    <DebuffItem
      key={i}
      activated={true}
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
    <Box display="flex" flexDirection="row">
      <List dense disablePadding>
        {debuffRows}
      </List>
      <List
        style={{ marginTop: "auto", marginBottom: "auto" }}
        dense
        disablePadding
      >
        {itemDebuffRows}
      </List>
    </Box>
  )
}

export default DebuffList
