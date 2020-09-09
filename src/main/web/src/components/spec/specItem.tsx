import React from "react"
import { ClassSpecType } from "../../types/api"
import { useDrag } from "react-dnd"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { ItemTypes } from "../../types/app"

interface SpecProps {
  color: string
  spec: ClassSpecType
}

const SpecItem: React.FC<SpecProps> = ({ color, spec }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.SPEC, value: spec.specName, color: color },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.4 : 1

  return (
    <ListItem button style={{ opacity, backgroundColor: color }} ref={drag}>
      <ListItemText primary={spec.specName} />
    </ListItem>
  )
}

export default SpecItem
