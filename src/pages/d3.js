import React, { useEffect, useState } from "react"
import styled from "styled-components"
import * as d3 from "d3"
import "intersection-observer"
import "intersection-observer"
import scrollama from "scrollama" // or...

const Fixed = () => {
  const [isActiveIndex, setIsActiveIndex] = useState()

  useEffect(() => {
    drawCircles()
    setUpScroll()
  }, [])
  function drawCircles() {
    console.log("hhhhhhhhhhhhhhhh")
    const data = ["one", "two", "three"]
    d3.select("svg")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", (d, i) => `circle-${i}`)
      .attr("cx", (d, i) => 200 + 50 * i)
      .attr("cy", (d, i) => 200 + 50 * i)
      .attr("r", 9)
      .attr("fill", "coral")
      .attr("opacity", 0.3)
  }
  function setUpScroll() {
    const scroller = scrollama()
    scroller
      .setup({
        step: ".step",
        debug: true, // this being true is what makes their dotted line show
        offset: 0.2, // where the dotted line shows up
        // progress: true,
      })
      .onStepEnter(res => {
        console.log("res:", res.element)
        d3.select(`.circle-${res.index}`).attr("fill", "lightsteelblue")
        setIsActiveIndex(res.index)
      })
      .onStepExit(res => {
        d3.select(`.circle-${res.index}`).attr("fill", "coral")

        setIsActiveIndex(undefined)
      })
  }
  const steps = ["a", "b", "c"]
  return (
    <>
      <Intro />
      <Scroll id="scroll">
        <Article>
          {steps.map((s, i) => {
            const isActive = i === isActiveIndex
            const background = isActive ? "linen" : "white"
            return (
              <Box className="step" style={{ background }} key={i}>
                {s}
              </Box>
            )
          })}
        </Article>
        <Chart></Chart>
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
const Chart = styled.svg`
  position: sticky;
  width: 50%;
  top: 200px;
  height: 400px;
  right: 2rem;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  border: 1px solid coral;
`
export default Fixed
