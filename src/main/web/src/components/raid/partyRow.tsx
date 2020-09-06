import React from "react"
import { TableCell, TableRow } from "@material-ui/core"
import { useDrop } from "react-dnd"
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

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.SPEC,
    drop: (item: SpecDragItemType) => {
      dispatch(setGridValue({ x: grid, y: row, value: item.value }))
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })

  return (
    <TableRow selected={isOver} ref={drop}>
      <TableCell style={{ height: 64 }} align="center">
        {value}
      </TableCell>
    </TableRow>
  )
}

export default PartyRow
