import React, { useEffect } from "react"
import styled from "styled-components"
import One from "../components/One"

import "intersection-observer"

const IndexPage = () => {
  return (
    <Scroll id="scroll">
      <One />
    </Scroll>
  )
}

const Scroll = styled.div`
  position: relative;
`

export default IndexPage
