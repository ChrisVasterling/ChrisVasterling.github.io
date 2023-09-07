import React from "react";
import { Box, SxProps } from '@mui/material'

export interface IGradientText {
  children: string,
  gradient: string,
  styles?: SxProps,
  enableShadow?: boolean
}

export default function GradientText(props: IGradientText): JSX.Element {
  const {gradient, styles, enableShadow} = props
  return (
    <Box 
      sx={{
        background: gradient,
        backgroundClip: "text",
        color: "transparent",
        display: "inline-block",
        filter: enableShadow ? "drop-shadow(-1px 1px 4px rgba(0, 0, 0, .4))" : "",
        ...styles
      }}
    >
      {props.children}
    </Box>
  )
}