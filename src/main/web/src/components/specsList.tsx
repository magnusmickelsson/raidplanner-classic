import React, { useState, useEffect } from "react"
import { fetchSpecs } from "../actions/fetch"
import { ClassSpecType } from "../types/api"
import { useDrag } from "react-dnd"
import Spec from "./spec"

const SpecsList: React.FC = () => {
  const [specs, setSpecs] = useState<ClassSpecType[]>([])

  useEffect(() => {
    fetchSpecs().then(specs => {
      setSpecs(specs)
    })
  }, [])

  const specsRows = specs.map((spec, i) => <Spec key={i} spec={spec} />)

  return <ul>{specsRows}</ul>
}

export default SpecsList
