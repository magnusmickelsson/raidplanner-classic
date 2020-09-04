import React from "react"
import { ClassSpecType } from "../types/api"
import { useDrag } from "react-dnd"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"

interface SpecProps {
  spec: ClassSpecType
}

const Spec: React.FC<SpecProps> = ({ spec }) => {
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: "TEST" },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.4 : 1

  return (
    <ListItem button style={{ opacity }} ref={dragRef}>
      <ListItemText primary={spec.specName} />
    </ListItem>
  )
}

export default Spec
