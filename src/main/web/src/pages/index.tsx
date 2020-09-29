import React, { useEffect, useState } from "react"
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
  Snackbar,
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
  editRaid,
  getRaid,
  _setLoadRaidError,
  _setLoadRaidDialogOpen,
  _setEditRaidSnackbarOpen,
  _setEditRaidError,
  _setCreateRaidError,
  _setCreateRaidSnackbarOpen,
} from "../state/app"
import {
  getDebuffsFromGrid,
  getDebuffsFromItems,
  getRaidIdFromUrlQuery,
} from "../utils/appUtils"
import DebuffList from "../components/debuff/debuffList"
import DebuffSlotsList from "../components/debuff/debuffSlotsList"
import ItemList from "../components/item/itemList"
import { ClassSpec } from "../types/api"
import { useLocation } from "@reach/router"
import { navigate } from "gatsby"
import LoadRaidDialog from "../components/loadRaidDialog"
import { Alert } from "@material-ui/lab"

const IndexPage: React.FC = () => {
  const [raidId, setRaidId] = useState<string | null>(null)

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
    loadRaidError,
    loadRaidDialogOpen,
    editRaidSnackbarOpen,
    editRaidError,
    createRaidSnackbarOpen,
    createRaidError,
  } = useSelector(appSelector)
  const dispatch = useDispatch()

  const location = useLocation()

  useEffect(() => {
    dispatch(getSpecs())
    dispatch(getSpecsByClassForFaction(selectedFaction))
    dispatch(getDebuffs())
    dispatch(getItems())

    const raidId = getRaidIdFromUrlQuery(location.search)

    if (raidId !== null) dispatch(getRaid(raidId))
  }, [])

  useEffect(() => {
    if (
      savedRaidId !== undefined &&
      savedRaidId !== getRaidIdFromUrlQuery(location.search)
    )
      navigate(`?raidId=${savedRaidId}`)
  }, [savedRaidId])

  useEffect(() => {
    setRaidId(getRaidIdFromUrlQuery(location.search))
  }, [location.search])

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

  const handleEditRaidClick = (raidId: string) => {
    dispatch(editRaid(gridValues, raidId))
  }

  const handleLoadDialogClose = () => {
    dispatch(_setLoadRaidDialogOpen(false))
    dispatch(_setLoadRaidError(undefined))
  }

  const handleEditSnackbarClose = () => {
    dispatch(_setEditRaidSnackbarOpen(false))
  }

  const handleEditErrorSnackbarClose = () => {
    dispatch(_setEditRaidError(undefined))
  }

  const handleCreateSnackbarClose = () => {
    dispatch(_setCreateRaidSnackbarOpen(false))
  }

  const handleCreateErrorSnackbarClose = () => {
    dispatch(_setCreateRaidError(undefined))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <SEO title="Home" description="" lang="en" meta={[]} />
        <Container>
          <Typography variant="h4">Debuff Planner</Typography>
          <Box
            style={{ alignItems: "center" }}
            display="flex"
            flexDirection="column"
          >
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
            <Box>
              <Button
                disabled={!gridHasValues}
                style={{
                  width: 32,
                  marginTop: 8,
                }}
                variant={"contained"}
                color={"primary"}
                onClick={handleSaveRaidClick}
              >
                Create
              </Button>
              <Button
                disabled={raidId === null}
                style={{
                  width: 32,
                  marginLeft: 8,
                  marginTop: 8,
                }}
                variant={"contained"}
                color={"primary"}
                onClick={() => handleEditRaidClick(raidId || "")}
              >
                Edit
              </Button>
              <Button
                style={{
                  width: 32,
                  marginLeft: 8,
                  marginTop: 8,
                }}
                variant={"contained"}
                color={"primary"}
                onClick={() => dispatch(_setLoadRaidDialogOpen(true))}
              >
                Load
              </Button>
            </Box>
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
                {raidId !== null && (
                  <Typography
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "fit-content",
                      marginBottom: 8,
                    }}
                    variant={"subtitle2"}
                  >{`Raid ID: ${raidId}`}</Typography>
                )}
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
          <LoadRaidDialog
            open={loadRaidDialogOpen}
            errorMsg={loadRaidError}
            handleClose={handleLoadDialogClose}
            handleLoadClick={_raidId => dispatch(getRaid(_raidId))}
          />
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={editRaidSnackbarOpen}
            autoHideDuration={6000}
            onClose={handleEditSnackbarClose}
          >
            <Alert onClose={handleEditSnackbarClose} severity="success">
              Raid successfully edited!
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={editRaidError !== undefined}
            autoHideDuration={6000}
            onClose={handleEditErrorSnackbarClose}
          >
            <Alert onClose={handleEditErrorSnackbarClose} severity="error">
              {editRaidError}
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={createRaidSnackbarOpen}
            autoHideDuration={6000}
            onClose={handleCreateSnackbarClose}
          >
            <Alert onClose={handleCreateSnackbarClose} severity="success">
              Raid successfully created!
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={createRaidError !== undefined}
            autoHideDuration={6000}
            onClose={handleCreateErrorSnackbarClose}
          >
            <Alert onClose={handleCreateErrorSnackbarClose} severity="error">
              {createRaidError}
            </Alert>
          </Snackbar>
        </Container>
      </Layout>
    </DndProvider>
  )
}

export default IndexPage
