import React, { useEffect } from "react"
import styled from "styled-components"

import "intersection-observer"
import scrollama from "scrollama" // or...

const Two = () => {
  //   const container = useRef(null)
  //   const graphic = useRef(null)
  //   const chart = useRef(null)
  //   const text = useRef(null)

  // initialize the scrollama

  // resize function to set dimensions on load and on page resize
  // function handleResize() { ... }

  // scrollama event handlers
  function handleStepEnter(response) {
    console.log("enter")
  }

  function handleContainerEnter(response) {
    console.log("container enter")
  }

  function handleContainerExit(response) {
    console.log("container exit")
  }

  // kick-off code to run once on load
  function init() {
    var scroller = scrollama()

    scroller
      .setup({
        container: "#scroll", // our outermost scrollytelling element
        graphic: ".scroll__graphic", // the graphic
        text: ".scroll__text", // the step container
        step: ".scroll__text .step", // the step elements
        offset: 0.5, // set the trigger to be 1/2 way down screen
        // debug: true, // display the trigger offset for testing
      })
      .onStepEnter(handleStepEnter)
      .onContainerEnter(handleContainerEnter)
      .onContainerExit(handleContainerExit)
  }

  // start it up
  useEffect(() => {
    // const steps = d3.selectAll(".step")s
    // init()
  }, [])

  return null
}

export default Two
