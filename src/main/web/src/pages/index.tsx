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
  Button,
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
  getItems,
  saveRaid,
} from "../state/app"
import { getDebuffsFromGrid, getDebuffsFromItems } from "../utils/appUtils"
import DebuffList from "../components/debuff/debuffList"
import DebuffSlotsList from "../components/debuff/debuffSlotsList"
import ItemList from "../components/item/itemList"
import { ClassSpec } from "../types/api"

const IndexPage: React.FC = () => {
  const {
    specs,
    specsByClass,
    gridValues,
    debuffs,
    selectedFaction,
    debuffSlots,
    items,
    activeItems,
    savedRaidId,
  } = useSelector(appSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSpecs())
    dispatch(getSpecsByClassForFaction(selectedFaction))
    dispatch(getDebuffs())
    dispatch(getItems())
  }, [])

  const specsLists = Object.keys(specsByClass).map((wowClass, i) => {
    return (
      <Paper key={i} style={{ marginBottom: 8 }}>
        <SpecsList wowClass={wowClass} specs={specsByClass[wowClass]} />
      </Paper>
    )
  })

  const activeDebuffs = getDebuffsFromGrid(gridValues, specs, 40 / partySize)
  const debuffsFromItems = getDebuffsFromItems(activeItems)

  let gridHasValues = false

  for (let i = 0; i < 40 / partySize; i++) {
    const hasValue =
      (gridValues[i] as ClassSpec[]).find(
        (item: ClassSpec | undefined) => item !== undefined,
      ) !== undefined

    if (hasValue) {
      gridHasValues = true
      break
    }
  }

  const handleFactionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value
    dispatch(selectFaction(value))
    dispatch(getSpecsByClassForFaction(value))
  }

  const handleSaveRaidClick = () => {
    dispatch(saveRaid(gridValues))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <SEO title="Home" description="" lang="en" meta={[]} />
        <Container>
          <Typography variant="h4">Debuff Planner</Typography>
          <Box display="flex" flexDirection="column">
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="faction"
                name="faction1"
                value={selectedFaction}
                onChange={handleFactionChange}
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
            <Button
              disabled={!gridHasValues}
              style={{
                width: 32,
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 8,
              }}
              variant={"contained"}
              color={"primary"}
              onClick={handleSaveRaidClick}
            >
              Save
            </Button>
            {savedRaidId && (
              <Typography
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 8,
                }}
                variant={"subtitle2"}
              >
                {savedRaidId}
              </Typography>
            )}
          </Box>
          <Box display="flex" flexDirection="row">
            <Box display="flex" flexDirection="row">
              <Box
                style={{
                  maxWidth: 180,
                  marginRight: 48,
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                <Paper>
                  <ItemList items={items} activeItems={activeItems} />
                </Paper>
              </Box>
              <Box
                style={{
                  maxWidth: 180,
                  marginRight: 48,
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
            <Box style={{ marginLeft: 32, marginRight: 32 }}>
              <DebuffList
                debuffs={debuffs}
                itemDebuffs={debuffsFromItems}
                debuffSlots={debuffSlots}
                activeDebuffs={activeDebuffs}
              />
            </Box>
            <Box
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                maxWidth: 180,
                minWidth: 80,
              }}
            >
              <Typography
                align="center"
                variant="h6"
                style={{ marginBottom: 8 }}
              >
                Debuff Slots
              </Typography>
              <Paper>
                <DebuffSlotsList debuffSlots={debuffSlots} />
              </Paper>
            </Box>
          </Box>
        </Container>
      </Layout>
    </DndProvider>
  )
}

export default IndexPage
