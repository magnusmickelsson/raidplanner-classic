import React from "react"
import { TableCell, TableRow } from "@material-ui/core"
import { useDrop, useDrag } from "react-dnd"
import { ItemTypes, SpecDragItemType } from "../../types/app"
import { useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import { setGridValue } from "../../state/app"
import { ClassSpec } from "../../types/api"

interface PartyRowProps {
  grid: number
  row: number
  value: ClassSpec | undefined
  color: string
}

const useStyles = makeStyles({
  root: {
    "&:hover": {
      opacity: "0.5 !important",
    },
  },
})

const PartyRow: React.FC<PartyRowProps> = ({ grid, row, value, color }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.SPEC,
      value: value,
      prevGridValue: { x: grid, y: row, value: undefined },
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      isDraggable: monitor.canDrag(),
    }),
    canDrag: () => value !== undefined,
    end: (dropResult, monitor) => {
      const didDrop = monitor.didDrop()
      if (!didDrop) {
        dispatch(
          setGridValue({
            prev_x: undefined,
            prev_y: undefined,
            gridValue: { x: grid, y: row, value: undefined },
          }),
        )
      }
    },
  })

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.SPEC,
    drop: (item: SpecDragItemType) => {
      dispatch(
        setGridValue({
          prev_x: item.prevGridValue ? item.prevGridValue.x : undefined,
          prev_y: item.prevGridValue ? item.prevGridValue.y : undefined,
          gridValue: {
            x: grid,
            y: row,
            value: item.value,
          },
        }),
      )
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })

  const opacity = isDragging ? 0.4 : 1

  return (
    <TableRow
      className={value ? classes.root : undefined}
      selected={isOver}
      ref={drop}
    >
      <TableCell
        ref={drag}
        align="center"
        style={{
          backgroundColor: color,
          paddingRight: 0,
          overflow: "auto",
          opacity,
          cursor: value ? "move" : "default",
        }}
      >
        {value ? value.specName : "-"}
      </TableCell>
    </TableRow>
  )
}

export default PartyRow
