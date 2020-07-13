import React, { useEffect, useState } from "react"
import styled from "styled-components"

import scrollama from "scrollama" // or...
import "intersection-observer"
import * as d3 from "d3"
const IndexPage = () => {
  const [isActiveIndex, setIsActiveIndex] = useState()

  useEffect(() => {
    const scroller = scrollama()

    scroller
      .setup({
        step: ".step",
        debug: true, // this being true is what makes their dotted line show
        offset: 0, // where the dotted line shows up
        progress: true,
      })
      .onStepEnter(res => {
        console.log("enterrrrrrrrrrr")
        setIsActiveIndex(res.index)
      })
      .onStepExit(res => {
        console.log("exxxxxxxxxit")
        setIsActiveIndex(undefined)
      })
      .onStepProgress(handleStepProgress)

    function handleStepProgress(response) {
      console.log(response.progress)
      d3.select(response.element)
        .select("p")
        .text(d3.format(".1%")(response.progress))
    }
  }, [])
  const steps = ["a", "b", "c"]

  return (
    <Scroll id="scroll">
      <Container>
        {steps.map((s, i) => {
          const isActive = i === isActiveIndex
          const background = isActive ? "pink" : "red"
          return (
            <Box className="step" style={{ background }} key={i}>
              <P>{s}</P>
            </Box>
          )
        })}

        <Outro />
      </Container>
    </Scroll>
  )
}

const Scroll = styled.div`
  position: relative;
`
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
  position: relative;
`
const P = styled.p`
  font-size: 50px;
  position: absolute;
  bottom: 0;
  right: 0;
`
export default IndexPage
