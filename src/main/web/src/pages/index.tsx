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
import { appSelector, getSpecs } from "../state/app"
import { specsByClasses } from "../utils/appUtils"

const IndexPage: React.FC = () => {
  const { specs, gridValues } = useSelector(appSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSpecs())
  }, [])

  const _specsByClasses = specsByClasses(specs)

  const specsLists = Object.keys(_specsByClasses).map((specs, i) => {
    return (
      <Paper key={i} style={{ maxWidth: 256, marginTop: 12 }}>
        <SpecsList specs={_specsByClasses[specs]} />
      </Paper>
    )
  })

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <SEO title="Home" description="" lang="en" meta={[]} />
        <Container>
          <h1>Debuff Planner</h1>
          <p>
            Welcome to the Debuff Planner. Here you can set up a raid and plan
            accordingly.
          </p>
          <Box display="flex" flexDirection="row">
            <Box style={{ marginRight: 64 }}>{specsLists}</Box>
            <RaidGrid gridValues={gridValues} numParties={40 / partySize} />
          </Box>
        </Container>
      </Layout>
    </DndProvider>
  )
}

export default IndexPage
