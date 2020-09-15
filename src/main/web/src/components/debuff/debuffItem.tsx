import React from "react"
import { Debuff } from "../../types/api"
import ListItem from "@material-ui/core/ListItem"
import { Chip } from "@material-ui/core"
import { useDrag } from "react-dnd"
import { makeStyles } from "@material-ui/core/styles"
import { ItemTypes } from "../../types/app"

interface DebuffItemProps {
  debuff: Debuff
  activated: boolean
  slotted: boolean
}

const useStyles = makeStyles({
  root: {
    "&:hover": {
      opacity: "0.5 !important",
    },
  },
})

const DebuffItem: React.FC<DebuffItemProps> = ({
  debuff,
  activated,
  slotted,
}) => {
  const classes = useStyles()
  const canDrag = activated && !slotted

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.DEBUFF, value: debuff },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      isDraggable: monitor.canDrag(),
    }),
    canDrag: () => canDrag,
  })

  const opacity = isDragging ? 0.35 : 1

  return (
    <ListItem disabled={!activated} style={{ marginBottom: 2 }}>
      <Chip
        className={canDrag ? classes.root : undefined}
        ref={drag}
        color={!activated || !slotted ? "default" : "primary"}
        size="small"
        label={debuff.name}
        style={{ opacity, cursor: canDrag ? "move" : "default" }}
      />
    </ListItem>
  )
}

export default DebuffItem
