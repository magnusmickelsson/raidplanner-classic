import React, { useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/container"
import SpecsList from "../components/spec/specsList"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Paper, Box } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import RaidGrid from "../components/raid/raidGrid"
import { partySize } from "../constants/wow"
import { appSelector, getSpecs, getDebuffs } from "../state/app"
import { specsByClasses, getDebuffsFromGrid } from "../utils/appUtils"
import DebuffList from "../components/debuff/debuffList"

const IndexPage: React.FC = () => {
  const { specs, gridValues, debuffs } = useSelector(appSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSpecs())
    dispatch(getDebuffs())
  }, [])

  const _specsByClasses = specsByClasses(specs)

  const specsLists = Object.keys(_specsByClasses).map((specs, i) => {
    return (
      <Paper key={i} style={{ maxWidth: 256, marginTop: 12 }}>
        <SpecsList specs={_specsByClasses[specs]} />
      </Paper>
    )
  })

  const activeDebuffs = getDebuffsFromGrid(gridValues, specs, 40 / partySize)

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <SEO title="Home" description="" lang="en" meta={[]} />
        <Container>
          <h1>Debuff Planner</h1>
          <Box display="flex" flexDirection="row">
            <Box display="flex" flexDirection="row">
              <Box style={{ minWidth: 220, marginRight: 64 }}>{specsLists}</Box>
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
