import React from "react"
import {
  Grid,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableBody,
} from "@material-ui/core"
import { partySize } from "../../constants/wow"
import PartyRow from "./partyRow"

interface PartyGridTypes {
  partyNum: number
  partyValues: string[]
}

const PartyGrid: React.FC<PartyGridTypes> = ({ partyNum, partyValues }) => {
  const rows = []

  for (let j = 0; j < partySize; j++) {
    rows.push(
      <PartyRow key={j} grid={partyNum - 1} row={j} value={partyValues[j]} />,
    )
  }

  return (
    <Grid item xs={6} style={{ width: 58, textAlign: "center" }}>
      <Typography variant={"h6"}>{partyNum}</Typography>
      <TableContainer component={Paper}>
        <Table size="small" style={{ margin: 0 }}>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default PartyGrid
