import React from "react"
import { TableCell, TableRow } from "@material-ui/core"
import { useDrop, useDrag } from "react-dnd"
import { ItemTypes, SpecDragItemType } from "../../types/app"
import { useDispatch } from "react-redux"
import { setGridValue } from "../../state/app"

interface PartyRowProps {
  grid: number
  row: number
  value: string
}

const PartyRow: React.FC<PartyRowProps> = ({ grid, row, value }) => {
  const dispatch = useDispatch()

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.SPEC,
      value: value,
      prevGridValue: { x: grid, y: row, value: undefined },
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const didDrop = monitor.didDrop()
      if (!didDrop) {
        dispatch(setGridValue({ x: grid, y: row, value: "" }))
      }
    },
  })

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.SPEC,
    drop: (item: SpecDragItemType) => {
      if (item.prevGridValue) dispatch(setGridValue(item.prevGridValue))
      dispatch(setGridValue({ x: grid, y: row, value: item.value }))
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })

  const opacity = isDragging ? 0.4 : 1

  return (
    <TableRow selected={isOver} ref={drop}>
      <TableCell
        ref={drag}
        align="center"
        style={{ paddingRight: 0, overflow: "auto", opacity }}
      >
        {value || "-"}
      </TableCell>
    </TableRow>
  )
}

export default PartyRow
