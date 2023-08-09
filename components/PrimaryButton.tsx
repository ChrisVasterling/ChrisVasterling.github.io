import React, { useState } from 'react'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'


export default function PrimaryButton(propsActual: any): JSX.Element {
  // So long as borderWidth is less than borderRadius, the inside will have rounded borders
  const props = {
    padding: 10,
    borderRadius: 5,
    borderGradient: "linear-gradient(45deg, purple, blue)",
    borderWidth: 4,
    fontFamily: "sans-serif",
    fontSize: "25px",
    children: "Button Content"
  }
  const containerStyles = {
    display: "inline-flex",
    background: props.borderGradient,
    borderRadius: props.borderRadius + "px",
    padding: props.borderWidth + "px",
    transition: "all 100ms ease-in-out",
    cursor: "pointer",
    fontFamily: props.fontFamily,
    fontSize: props.fontSize
  }
  const innerStyles = {
    borderRadius: props.borderRadius - props.borderWidth + "px",
    padding: props.padding + "px",
    //paddingLeft: props.borderWidth / 2,
    //paddingRight: props.borderWidth / 2,
    backgroundColor: "white",
    transition: "all 100ms ease-in-out",
  }

  const [containerState, setContainterState] = useState(containerStyles)
  const [innerState, setInnerState] = useState(innerStyles)

  return (
    <>
      <button style={{
        display: "inline-flex",
        padding: props.padding + "px",
        borderRadius: props.borderRadius + "px",
        border: props.borderWidth + "px" + " solid black",
        fontFamily: props.fontFamily,
        fontSize: props.fontSize  
      }}>
        Button Content
      </button>
      <div style={containerState}>
        <div style={innerState}>
          {props.children}
        </div>
      </div>
    </>
  )
}
