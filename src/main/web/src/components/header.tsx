import { Link } from "gatsby"
import React from "react"
import styled from "@emotion/styled"

const StyledHeader = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
  display: flex;
  padding: 16px;
`

const StyledHeaderText = styled.h1`
  margin: 0;
  width: fit-content;
`

const StyledMenu = styled.div`
  margin: auto 0 auto auto;
  display: flex;
`

const StyledMenuItem = styled.h3`
  margin: 0 16px;
`

interface HeaderProps {
  siteTitle: string
}

const Header: React.FC<HeaderProps> = ({ siteTitle }) => (
  <StyledHeader>
    <StyledHeaderText>
      <Link
        to="/"
        style={{
          color: `white`,
          textDecoration: `none`,
        }}
      >
        {siteTitle}
      </Link>
    </StyledHeaderText>
    <StyledMenu>
      <StyledMenuItem>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          About
        </Link>
      </StyledMenuItem>
      <StyledMenuItem>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          Contact
        </Link>
      </StyledMenuItem>
    </StyledMenu>
  </StyledHeader>
)

export default Header
