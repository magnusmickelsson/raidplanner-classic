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
    <ListItem disabled={!activated} style={{ marginBottom: 0 }}>
      <Chip label={debuff.name} />
    </ListItem>
  )
}

export default DebuffItem
