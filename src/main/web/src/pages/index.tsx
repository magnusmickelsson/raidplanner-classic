import React, { useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/container"
import SpecsList from "../components/spec/specsList"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import {
  Paper,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import RaidGrid from "../components/raid/raidGrid"
import { partySize, factions } from "../constants/wow"
import {
  appSelector,
  getDebuffs,
  selectFaction,
  getSpecsByClassForFaction,
  getSpecs,
} from "../state/app"
import { getDebuffsFromGrid } from "../utils/appUtils"
import DebuffList from "../components/debuff/debuffList"

const IndexPage: React.FC = () => {
  const {
    specs,
    specsByClass,
    gridValues,
    debuffs,
    selectedFaction,
  } = useSelector(appSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSpecs())
    dispatch(getSpecsByClassForFaction(selectedFaction))
    dispatch(getDebuffs())
  }, [])

  const specsLists = Object.keys(specsByClass).map((wowClass, i) => {
    return (
      <Paper key={i} style={{ marginTop: 12 }}>
        <SpecsList wowClass={wowClass} specs={specsByClass[wowClass]} />
      </Paper>
    )
  })

  const activeDebuffs = getDebuffsFromGrid(gridValues, specs, 40 / partySize)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value
    dispatch(selectFaction(value))
    dispatch(getSpecsByClassForFaction(value))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <SEO title="Home" description="" lang="en" meta={[]} />
        <Container>
          <Typography variant="h4">Debuff Planner</Typography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="faction"
              name="faction1"
              value={selectedFaction}
              onChange={handleChange}
            >
              <FormControlLabel
                value={factions.ALLIANCE.toLowerCase()}
                control={<Radio />}
                label={factions.ALLIANCE}
              />
              <FormControlLabel
                value={factions.HORDE.toLowerCase()}
                control={<Radio />}
                label={factions.HORDE}
              />
            </RadioGroup>
          </FormControl>
          <Box display="flex" flexDirection="row">
            <Box display="flex" flexDirection="row">
              <Box
                style={{
                  maxWidth: 180,
                  marginRight: 64,
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                {specsLists}
              </Box>
              <Box style={{ marginTop: "auto", marginBottom: "auto" }}>
                <RaidGrid gridValues={gridValues} numParties={40 / partySize} />
              </Box>
            </Box>
            <Box style={{ marginLeft: 48 }}>
              <DebuffList debuffs={debuffs} activeDebuffs={activeDebuffs} />
            </Box>
          </Box>
        </Container>
      </Layout>
    </DndProvider>
  )
}

export default IndexPage
