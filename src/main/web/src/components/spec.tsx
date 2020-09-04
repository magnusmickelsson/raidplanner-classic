import React from "react"
import { ClassSpecType } from "../types/api"
import { useDrag } from "react-dnd"

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
    <li style={{ opacity }} ref={dragRef}>
      {spec.specName}
    </li>
  )
}

export default Spec
