import React from "react"
import { ClassSpec } from "../../types/api"
import { useDrag } from "react-dnd"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { ItemTypes } from "../../types/app"
import { makeStyles } from "@material-ui/core/styles"

interface SpecProps {
  color: string
  spec: ClassSpec
}

const useStyles = makeStyles({
  root: {
    "&:hover": {
      opacity: "0.5 !important",
    },
  },
})

const SpecItem: React.FC<SpecProps> = ({ color, spec }) => {
  const classes = useStyles()

  const val: ClassSpec = {
    className: spec.className,
    specName: spec.specName,
    canApplyDebuff: [], // We don't want to send over unnecessary data, so just use an empty array
  }

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.SPEC, value: val, color: color },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.35 : 1

  return (
    <ListItem
      className={classes.root}
      component="div"
      style={{ opacity: opacity, backgroundColor: color, cursor: "move" }}
      ref={drag}
    >
      <ListItemText primary={spec.specName} />
    </ListItem>
  )
}

export default SpecItem
