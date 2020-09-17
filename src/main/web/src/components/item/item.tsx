import {
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from "@material-ui/core"
import React from "react"
import { useDispatch } from "react-redux"
import { toggleItem } from "../../state/app"
import { DebuffItem } from "../../types/api"

interface ItemProps {
  item: DebuffItem
  checked: boolean
}

const Item: React.FC<ItemProps> = ({ item, checked }) => {
  const dispatch = useDispatch()

  const handleToggle = () => {
    dispatch(toggleItem(item))
  }

  return (
    <ListItem role={undefined} dense button onClick={handleToggle}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={checked}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": item.name }}
        />
      </ListItemIcon>
      <ListItemText id={item.name} primary={item.name} />
    </ListItem>
  )
}

export default Item
