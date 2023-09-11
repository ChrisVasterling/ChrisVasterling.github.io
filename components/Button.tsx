import React, { useState } from 'react'
// import GradientBox, { IGradientBoxStyle } from './GradientBox'
import { Box, SxProps } from '@mui/material'
import GradientBox, { IGradientBoxOptional }  from './GradientBox'

export enum ButtonTypes {
  Primary,
  Secondary
}

export interface IButton {
  children: JSX.Element | JSX.Element[] | string,
  type?: ButtonTypes,
  background?: string,
  propsGB?: IGradientBoxOptional // Manually change optional props
  onClick?: () => void,
  onMouseOver?: () => void
}

export default function Button(props: IButton): JSX.Element {
  const { type, background, propsGB } = props

  // Default if no type is set
  let defaultBKColor = "transparent"

  if (type == ButtonTypes.Primary) {
    defaultBKColor = "transparent";
  } else if (type === ButtonTypes.Secondary) {
    defaultBKColor = "white";
  }

  return (
    <Box
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      sx={{
        margin: 0,
        padding: 0,
        display: "inline-block"
      }}
    >
      <GradientBox
        gradient={background ?? "linear-gradient(lightgrey, lightgrey)"}
        styles={{
          padding: "10px",
          borderWidth: 4,
          borderRadius: 10
        }}
        {...propsGB}
      >
        {props.children}
      </GradientBox>
    </Box>
  )
}
