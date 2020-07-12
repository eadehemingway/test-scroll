import React, { useEffect, useState } from "react"
import styled from "styled-components"

import "intersection-observer"
import scrollama from "scrollama" // or...

const One = () => {
  const [isActiveIndex, setIsActiveIndex] = useState()

  useEffect(() => {
    const scroller = scrollama()

    scroller
      .setup({
        step: ".step",
        debug: true, // this being true is what makes their dotted line show
        offset: 0.2, // where the dotted line shows up
        // progress: true,
      })
      .onStepEnter(res => {
        console.log("enterrrrrrrrrrr")
        setIsActiveIndex(res.index)
      })
      .onStepExit(res => {
        console.log("exxxxxxxxxit")
        setIsActiveIndex(undefined)
      })
  }, [])

  const steps = ["a", "b", "c"]
  return (
    <Container>
      {steps.map((s, i) => {
        const isActive = i === isActiveIndex
        const background = isActive ? "pink" : "red"
        return (
          <Box className="step" style={{ background }} key={i}>
            {s}
          </Box>
        )
      })}

      <Outro />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`
const Outro = styled.div`
  height: 1000px;
`
const Box = styled.div`
  min-height: 300px;
  height: 300px;
  width: 300px;
  background: red;
  margin: 200px;
  margin-bottom: 0;
`

export default One
