/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import Container from "./container"
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core"

const StyledLayout = styled.div`
  margin: 3rem auto;
  padding: 0 1rem;
`

const StyledFooter = styled.footer`
  margin-top: 32px;
`

const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" style={{ flexGrow: 1 }}>
            {data.title}
          </Typography>
          <Button color="inherit">About</Button>
        </Toolbar>
      </AppBar>
      <StyledLayout>
        <Container>
          <main>{children}</main>
          <StyledFooter>
            <Typography variant="subtitle1">
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </Typography>
          </StyledFooter>
        </Container>
      </StyledLayout>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
