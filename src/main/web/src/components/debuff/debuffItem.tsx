import React from "react"
import { Debuff } from "../../types/api"
import ListItem from "@material-ui/core/ListItem"
import { Chip } from "@material-ui/core"

interface DebuffItemProps {
  debuff: Debuff
  activated: boolean
}

const DebuffItem: React.FC<DebuffItemProps> = ({ debuff, activated }) => {
  return (
    <ListItem disabled={!activated} style={{ marginBottom: 2 }}>
      <Chip
        color={!activated ? "default" : "primary"}
        size="small"
        label={debuff.name}
      />
    </ListItem>
  )
}

export default DebuffItem
