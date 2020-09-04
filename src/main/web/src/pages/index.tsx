import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/container"
import SpecsList from "../components/specsList"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const IndexPage: React.FC = () => {
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
        </Container>
        <SpecsList />
      </Layout>
    </DndProvider>
  )
}

export default IndexPage
