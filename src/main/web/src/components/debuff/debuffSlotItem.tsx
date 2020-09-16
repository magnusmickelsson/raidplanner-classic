import React from "react"
import { Debuff } from "../../types/api"
import ListItem from "@material-ui/core/ListItem"
import { Divider, ListItemText } from "@material-ui/core"
import { DebuffDragItemType, ItemTypes } from "../../types/app"
import { useDrag, useDrop } from "react-dnd"
import { setDebuffSlot } from "../../state/app"
import { useDispatch } from "react-redux"

interface DebuffSlotItemProps {
  debuff: Debuff | undefined
  index: number
}

const DebuffSlotItem: React.FC<DebuffSlotItemProps> = ({ debuff, index }) => {
  const dispatch = useDispatch()

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.DEBUFF,
      value: debuff,
      prevDebuffListVal: { i: index, value: undefined },
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      isDraggable: monitor.canDrag(),
    }),
    canDrag: () => debuff !== undefined,
    end: (dropResult, monitor) => {
      const didDrop = monitor.didDrop()
      if (!didDrop) {
        dispatch(
          setDebuffSlot({ i: index, prev_i: undefined, value: undefined }),
        )
      }
    },
  })

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.DEBUFF,
    drop: (item: DebuffDragItemType) => {
      dispatch(
        setDebuffSlot({
          i: index,
          prev_i: item.prevDebuffListVal ? item.prevDebuffListVal.i : undefined,
          value: item.value,
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
    <div ref={drop}>
      <ListItem
        ref={drag}
        selected={isOver}
        style={{
          marginBottom: 2,
          opacity,
          cursor: debuff ? "move" : "default",
        }}
      >
        <ListItemText
          style={{
            textAlign: "center",
          }}
          primary={debuff ? debuff.name : index + 1}
        />
      </ListItem>
      <Divider />
    </div>
  )
}

export default DebuffSlotItem
