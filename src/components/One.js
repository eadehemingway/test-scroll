import React, { useEffect } from "react"
import styled from "styled-components"

import "intersection-observer"
import scrollama from "scrollama" // or...

const One = () => {
  useEffect(() => {
    const scroller = scrollama()

    scroller
      .setup({
        step: ".step",
        debug: true, // this being true is what makes their dotted line show
        offset: 0.2, // where the dotted line shows up
        // progress: true,
      })
      .onStepEnter(a => console.log("enterrrrrrrrrrrr", a))
      .onStepExit(b => console.log("exxxxxxxxxxxit", b))
  }, [])

  return (
    <>
      <Box className="step" data-step="a" style={{ marginTop: 200 }}></Box>
      <Box className="step" data-step="b"></Box>
      <Box className="step" data-step="c"></Box>
      <Outro />
    </>
  )
}

const Outro = styled.div`
  height: 1000px;
`
const Box = styled.div`
  min-height: 300px;
  height: 300px;
  width: 300px;
  background: red;
  margin: 100px;
`

export default One
