import React from "react"
import styled from "@emotion/styled"

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Container: React.FC = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
)

export default Container
