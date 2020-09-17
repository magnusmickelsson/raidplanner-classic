import React from "react"
import { DebuffItem } from "../../types/api"
import Item from "./item"
import List from "@material-ui/core/List"

interface SpecsListProps {
  items: DebuffItem[]
  activeItems: DebuffItem[]
}

const ItemList: React.FC<SpecsListProps> = ({ items, activeItems }) => {
  const itemRows = items.map((item, i) => (
    <Item key={i} item={item} checked={activeItems.indexOf(item) !== -1} />
  ))

  return (
    <List dense disablePadding>
      {itemRows}
    </List>
  )
}

export default ItemList
