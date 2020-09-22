import React, { useEffect, useState } from "react"
import styled from "styled-components"

import "intersection-observer"
import scrollama from "scrollama" // or...
import Nav from "../components/Nav"

const Fixed = () => {
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
    <>
      <Intro />
      <Scroll id="scroll">
        <Article>
          {steps.map((s, i) => {
            const isActive = i === isActiveIndex
            const background = isActive ? "pink" : "red"
            return (
              <Box className="step" style={{ background }} key={i}>
                {s}
              </Box>
            )
          })}
        </Article>
        <Figure>
          <p>0</p>
        </Figure>
      </Scroll>
      <Outro />
    </>
  )
}

const Scroll = styled.div`
  position: relative;
  border-top: 2px dashed #000;
  border-bottom: 2px dashed #000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
`
const Outro = styled.div`
  height: 1200px;
`
const Box = styled.div`
  margin: 0 auto 2rem auto;
  border: 1px solid #333;
  position: relative;
  height: 300px;
`
const Article = styled.div`
  position: relative;
  padding: 0 1rem;
  width: 30rem;
`
const Intro = styled.div`
  max-width: 40rem;
  margin: 1rem auto;
  text-align: center;
  margin-bottom: 400px;
`
const Figure = styled.figure`
  position: sticky;
  width: 50%;
  top: 0;
  height: 400px;
  right: 2rem;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  background-color: #ddd;
  border: 1px solid #000;
`
export default Fixed
