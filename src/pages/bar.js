import React, { useEffect, useState } from "react"
import styled from "styled-components"
import * as d3 from "d3"
import "intersection-observer"
import "intersection-observer"
import scrollama from "scrollama" // or...
import Nav from "../components/Nav"

const Fixed = () => {
  const svgWidth = 700
  const svgHeight = 400
  const [isActiveIndex, setIsActiveIndex] = useState()
  const data = [
    { key: 0, num: 6 },
    { key: 1, num: 20 },
    { key: 2, num: 21 },
    { key: 3, num: 14 },
    { key: 4, num: 2 },
    { key: 5, num: 30 },
    { key: 6, num: 7 },
    { key: 7, num: 16 },
    { key: 8, num: 25 },
    { key: 9, num: 5 },
    { key: 10, num: 11 },
    { key: 11, num: 28 },
    { key: 12, num: 10 },
    { key: 13, num: 26 },
    { key: 14, num: 9 },
  ]
  useEffect(() => {
    setUpScroll()
    draw()
  }, [])
  function draw() {
    const x_scale = calculateXScale()
    const y_scale = calculateYScale()
    const svg = d3
      .select("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
    const bars = svg.selectAll("rect").data(data, d => d.key)

    const enteringBars = bars
      .enter()
      .append("rect")
      .attr("class", (d, i) => `rect-${i}`)
      .attr("x", (_, i) => x_scale(i))
      .attr("y", svgHeight)
      .attr("width", x_scale.bandwidth())
      .attr("height", 0)
      .attr("fill", "LightSteelBlue ")

    const mergedBarSelection = enteringBars.merge(bars)

    mergedBarSelection
      .transition()
      .duration(750)
      .attr("x", (_, i) => x_scale(i))
      .attr("y", d => svgHeight - y_scale(d.num))
      .attr("width", x_scale.bandwidth())
      .attr("height", d => y_scale(d.num))

    bars.exit().transition().attr("x", -x_scale.bandwidth()).remove()

    const labels = svg.selectAll("text").data(data, d => d.key)

    const enteringLabels = labels
      .enter()
      .append("text")
      .text(d => d.num)
      .attr("x", (_, i) => x_scale(i) + x_scale.bandwidth() / 2)
      .attr("y", svgHeight)
      .attr("font-size", "14px")
      .attr("fill", "#fff")
      .attr("text-anchor", "middle")

    const mergedLabelSelection = enteringLabels.merge(labels)

    mergedLabelSelection
      .transition()
      .duration(1000)
      .attr("x", (_, i) => x_scale(i) + x_scale.bandwidth() / 2)
      .attr("y", d => svgHeight - y_scale(d.num) + 15)

    labels.exit().transition().attr("x", -x_scale.bandwidth()).remove()
  }

  function calculateXScale() {
    return d3
      .scaleBand()
      .domain(d3.range(data.length))
      .rangeRound([0, svgWidth])
      .paddingInner(0.05)
  }

  function calculateYScale() {
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.num)])
      .range([0, svgHeight - 100])
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
        let color = "pink"

        if (res.index === 1) {
          color = "coral"
        }
        if (res.index === 2) {
          color = "lavender"
        }
        d3.select(`.rect-${res.index + 4}`).attr("fill", color)
        setIsActiveIndex(res.index)
      })
      .onStepExit(res => {
        setIsActiveIndex(undefined)
        d3.select(`.rect-${res.index + 4}`).attr("fill", "lightsteelblue")
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
