import { Box, SxProps } from '@mui/material'
import React from 'react'

export interface IGradientBox {
  children: JSX.Element | JSX.Element[] | string,
  innerStyles?: SxProps,
  outerStyles?: SxProps,
  gradient: string,
  borderRadius?: number,
  borderWidth?: number,
  padding?: number,
}

/**
 * A generic box that helps with things that need a gradient background or border
 * In the case of a border, some additional calculations are required to ensure things look good
 * (e.g. styles on the outer container will impact the inner container)
 * 
 * Any style can be overridden using the innerStyles or outerStyles props
 */
export default function GradientBox(props: IGradientBox): JSX.Element {
  // So long as borderWidth is less than borderRadius, the inside will have rounded borders
  const {
    gradient,
    borderRadius,
    borderWidth,
    padding,
  } = props

  return (
    <Box
      sx={{
        display: "inline-flex",
        background: gradient,
        borderRadius: (borderRadius ? borderRadius : 0) + "px",
        padding: (borderWidth ? borderWidth : 0) + "px",
        ...props.outerStyles
      }}
    >
      <Box sx={{
        borderRadius: (borderRadius && borderWidth ? borderRadius - borderWidth : 0) + "px",
        padding: padding + "px",
        ...props.innerStyles
      }}>
        {props.children}
      </Box>
    </Box>
  )
}
