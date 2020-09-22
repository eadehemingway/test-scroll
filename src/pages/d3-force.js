import React, { useEffect, useState } from "react"
import styled from "styled-components"
import * as d3 from "d3"
import "intersection-observer"
import scrollama from "scrollama" // or...

const Fixed = () => {
  const svgWidth = 700
  const svgHeight = 500
  const [isActiveIndex, setIsActiveIndex] = useState()
  const [value, setValue] = useState("role")
  const categories = {
    role: ["student", "mentor"],
    campus: ["gaza", "khaleel"],
    gender: ["male", "female"],
  }
  const data = [
    {
      id: 2,
      value: 2,
      campus: "khaleel",
      gender: "female",
      role: "student",
    },
    { id: 3, value: 3, campus: "khaleel", gender: "male", role: "student" },
    { id: 4, value: 4, campus: "khaleel", gender: "male", role: "student" },
    { id: 6, value: 6, campus: "khaleel", gender: "female", role: "mentor" },
    { id: 7, value: 7, campus: "khaleel", gender: "female", role: "mentor" },
    {
      id: 8,
      value: 8,
      campus: "khaleel",
      gender: "female",
      role: "student",
    },
    { id: 10, value: 10, campus: "gaza", gender: "female", role: "student" },
    { id: 11, value: 11, campus: "gaza", gender: "male", role: "student" },
    { id: 12, value: 12, campus: "gaza", gender: "male", role: "student" },
    { id: 14, value: 14, campus: "gaza", gender: "female", role: "mentor" },
    { id: 15, value: 15, campus: "gaza", gender: "female", role: "mentor" },
    { id: 16, value: 16, campus: "gaza", gender: "female", role: "student" },
  ]
  useEffect(() => {
    drawCircles()
    setUpScroll()
  }, [])
  function drawCircles() {
    const svg = d3
      .select("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", d => d.value)
      .attr("class", "bubble")
      .attr("fill", d => (d.gender === "male" ? "coral" : "#c4c3d0"))
      .attr("opacity", 0.6)

    updateLabels()
    createSimulation()
  }

  function centerOfGravityForGroups(categories) {
    const firstCenter = svgWidth / 4
    const secondCenter = firstCenter * 3
    const yVal = svgHeight / 2
    const [groupOne, groupTwo] = categories
    return [
      { x: firstCenter, y: yVal, group: groupOne },
      { x: secondCenter, y: yVal, group: groupTwo },
    ]
  }

  function centerOfGravityForDatum(d) {
    const dataGroupArr = categories[value]
    const dataGroup = d[value]
    return centerOfGravityForGroups(dataGroupArr).find(
      e => e.group === dataGroup
    )
  }

  function updateLabels() {
    const dataGroupArr = categories[value]
    const updatedCategoriesCenter = centerOfGravityForGroups(dataGroupArr)

    const labelSelection = d3
      .select("svg")
      .selectAll("text")
      .data(updatedCategoriesCenter)

    labelSelection.exit().remove()

    const entering = labelSelection
      .enter()
      .append("text")
      .style("font-size", "20")
      .style("letter-spacing", "0.1rem")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")

    const updatedAndEnter = labelSelection.merge(entering)

    updatedAndEnter
      .text(d => d.group)
      .attr("x", d => d.x)
      .attr("opacity", "0.4")
      .attr("font-family", "futura")
      .attr("fill", "lightslategray")
      .attr("y", 100)
  }

  useEffect(() => {
    updateLabels()
    createSimulation()
  }, [value])

  function createSimulation() {
    const forceX = d3
      .forceX()
      .x(d => {
        return centerOfGravityForDatum(d).x
      })
      .strength(1)

    const forceY = d3
      .forceY()
      .y(d => centerOfGravityForDatum(d).y)
      .strength(1)

    d3.forceSimulation(data)
      .force(
        "collision",
        d3.forceCollide().radius(d => d.value + 3)
      )
      .force("x", forceX)
      .force("y", forceY)
      .alpha(0.1) // small alpha to have the elements move at a slower pace
      .on("tick", () => {
        d3.selectAll(".bubble").attr("transform", d => {
          return `translate(${d.x} ${d.y})`
        })
      })
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
        setValue(res.element.outerText)
        createSimulation()
        setIsActiveIndex(res.index)
      })
      .onStepExit(res => {
        setIsActiveIndex(undefined)
      })
  }
  const steps = ["role", "campus", "gender"]
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
  height: 600px;
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
