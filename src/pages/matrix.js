import React, { useEffect, useState } from "react"
import styled from "styled-components"
import * as d3 from "d3"
import "intersection-observer"
import scrollama from "scrollama" // or...
import Nav from "../components/Nav"

const Fixed = () => {
  const [isActiveIndex, setIsActiveIndex] = useState()
  const data = d3.range(100)
  useEffect(() => {
    drawCircles()
    setUpScroll()
  }, [])
  function drawCircles() {
    const dotsPerRow = 8
    const radius = 8
    const leftBoxPadding = 5
    const topBoxPadding = 100
    const campuses = data.reduce((acc, curr) => {
      if (!acc.includes(curr.campus)) acc.push(curr.campus)
      return acc
    }, [])

    const svgWidth = 700
    const svgHeight = 500
    const svg = d3
      .select("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)

    svg
      .selectAll("text")
      .data(campuses)
      .enter()
      .append("text")
      .text(d => d)
      .attr("x", d => leftBoxPadding)
      .attr(
        "y",
        d => getY2Coordinate(0, dotsPerRow, radius) + topBoxPadding - 30
      )
      .attr("font-family", "futura")
      .attr("fill", "lightslategray")

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("path")
      .attr(
        "d",
        "M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"
      )
      .attr("transform", d => {
        const campusXCoordinate = 100
        const x = campusXCoordinate + leftBoxPadding
        const y = getY2Coordinate(0, dotsPerRow, radius) + topBoxPadding
        return "translate(" + x + "," + y + ")"
      })
      .attr("fill", "lightsteelblue")

    d3.selectAll("path")
      .transition()
      .duration(500)
      .attr("transform", (d, i) => {
        const campusXCoordinate = 100

        const x =
          campusXCoordinate +
          getX2Coordinate(i, dotsPerRow, radius) +
          leftBoxPadding

        const y = getY2Coordinate(i, dotsPerRow, radius) + topBoxPadding

        return "translate(" + x + "," + y + ")"
      })
  }

  function getY2Coordinate(index, dotsPerRow, radius) {
    const placeInCol = Math.floor(index / dotsPerRow)
    const padding = 5
    return placeInCol * (padding + radius * 2)
  }

  function getX2Coordinate(index, dotsPerRow, radius) {
    const placeInRow = index % dotsPerRow
    const padding = 5
    return placeInRow * (radius * 2 + padding)
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
        d3.selectAll(`path`).attr("fill", "coral")
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
