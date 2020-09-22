import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { navigate } from "gatsby"

const Nav = () => {
  const pages = ["bar", "d3-force", "d3", "fixed", "matrix", "progress"]
  return (
    <Container>
      {pages.map(p => (
        <Tab onClick={() => navigate(p)}>{p}</Tab>
      ))}
    </Container>
  )
}

const Tab = styled.div`
  padding: 10px;
  border: 2px solid pink;
  cursor: pointer;
`
const Container = styled.div`
  display: flex;
`
export default Nav
