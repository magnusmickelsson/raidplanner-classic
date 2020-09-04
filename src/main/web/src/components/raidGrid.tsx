import React from "react"
import {
  Grid,
  Table,
  TableBody,
  TableRow,
  TableContainer,
  Paper,
  TableCell,
  Typography,
} from "@material-ui/core"
import { partySize } from "../constants/wow"

interface RaidGridProps {
  numParties: number
}

const RaidGrid: React.FC<RaidGridProps> = ({ numParties }) => {
  const grids = []

  for (let i = 0; i < numParties; i++) {
    const rows = []

    for (let j = 0; j < partySize; j++) {
      rows.push(
        <TableRow key={`${i}_${j}`}>
          <TableCell align="center">Placeholder</TableCell>
        </TableRow>,
      )
    }

    grids.push(
      <Grid key={i} item xs={5} style={{ textAlign: "center" }}>
        <Typography>{i + 1}</Typography>
        <TableContainer component={Paper}>
          <Table style={{ margin: 0 }}>
            <TableBody>{rows}</TableBody>
          </Table>
        </TableContainer>
      </Grid>,
    )
  }

  return (
    <Grid container spacing={2}>
      {grids}
    </Grid>
  )
}

export default RaidGrid
