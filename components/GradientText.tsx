import React from "react";
import { Box, SxProps } from '@mui/material'

export interface IGradientText {
  children: string,
  gradient: string,
  styles?: SxProps
}

export default function GradientText(props: IGradientText): JSX.Element {
  const {gradient, styles} = props
  return (
    <Box 
      sx={{
        background: gradient,
        backgroundClip: "text",
        color: "transparent",
        display: "inline-block",
        filter: "drop-shadow(-1px 1px 4px rgba(0, 0, 0, .4))",
        ...styles
      }}
    >
      {props.children}
    </Box>
  )
}