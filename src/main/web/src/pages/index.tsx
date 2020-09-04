import React, { useState, useEffect } from "react"
import { fetchSpecs } from "../actions/fetch"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/container"
import SpecsList from "../components/specsList"
import { ClassSpecType } from "../types/api"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Paper, Box } from "@material-ui/core"
import RaidGrid from "../components/raidGrid"
import { partySize } from "../constants/wow"

interface SpecsByClasses {
  [key: string]: ClassSpecType[]
}

const IndexPage: React.FC = () => {
  const [specs, setSpecs] = useState<ClassSpecType[]>([])

  useEffect(() => {
    fetchSpecs().then(specs => {
      setSpecs(specs)
    })
  }, [])

  const specsByClasses: SpecsByClasses = {}

  specs.forEach(spec => {
    if (specsByClasses[spec.className])
      specsByClasses[spec.className].push(spec)
    else specsByClasses[spec.className] = [spec]
  })

  const specsLists = Object.keys(specsByClasses).map((specs, i) => {
    return (
      <Paper key={i} style={{ maxWidth: 256, marginTop: 12 }}>
        <SpecsList specs={specsByClasses[specs]} />
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
            <RaidGrid numParties={40 / partySize} /> {/* Depends on raid*/}
          </Box>
        </Container>
      </Layout>
    </DndProvider>
  )
}

export default IndexPage
