import React from "react"
import {
  Grid,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableBody,
} from "@material-ui/core"
import { partySize, colorByClass } from "../../constants/wow"
import PartyRow from "./partyRow"
import { ClassSpecType } from "../../types/api"

interface PartyGridTypes {
  partyNum: number
  partyValues: ClassSpecType[]
}

const PartyGrid: React.FC<PartyGridTypes> = ({ partyNum, partyValues }) => {
  const rows = []

  for (let j = 0; j < partySize; j++) {
    const color =
      colorByClass[partyValues[j] ? partyValues[j].className : undefined]
    rows.push(
      <PartyRow
        key={j}
        grid={partyNum - 1}
        row={j}
        value={partyValues[j]}
        color={color}
      />,
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
