import React from "react"
import { Grid } from "@material-ui/core"
import PartyGrid from "./partyGrid"

interface RaidGridProps {
  numParties: number
  gridValues: string[][]
}

const RaidGrid: React.FC<RaidGridProps> = ({ numParties, gridValues }) => {
  const grids = []

  for (let i = 0; i < numParties; i++) {
    grids.push(
      <PartyGrid key={i} partyNum={i + 1} partyValues={gridValues[i]} />,
    )
  }

  return (
    <Grid container spacing={2} style={{ height: "fit-content" }}>
      {grids}
    </Grid>
  )
}

export default RaidGrid
