import React, { CSSProperties, useRef } from 'react'
// import GradientBox, { IGradientBoxStyle } from './GradientBox'
import { Box, ButtonBase, useTheme } from '@mui/material'
import GradientBox, { IGradientBoxOptional }  from './GradientBox'
import { TouchRippleActions } from '@mui/material/ButtonBase/TouchRipple'

export enum ButtonTypes {
  Primary,
  Secondary
}

export interface IButton {
  children: JSX.Element | JSX.Element[] | string,
  type?: ButtonTypes,
  background?: string,
  GBOptional?: IGradientBoxOptional // Manually change optional props
  styles?: CSSProperties
  onClick?: () => void,
  onMouseOver?: () => void
}

export default function Button(props: IButton): JSX.Element {
  const { type, background, GBOptional, styles } = props

  const touchRippleRef = useRef<TouchRippleActions>(null)
  const theme = useTheme()
  const rippleDuration = theme.transitions.duration.complex * 2

  // Default if no type is set
  let defaultBKColor: string | undefined = undefined

  if (type == ButtonTypes.Primary) {
    defaultBKColor = background;
  } else if (type === ButtonTypes.Secondary) {
    defaultBKColor = "white";
  }

  const handleRippleStart = (e: React.MouseEvent): void => {
    touchRippleRef?.current?.start(e)
  }

  const handleRippleStop = (e: React.MouseEvent): Promise<void> => {
    touchRippleRef?.current?.stop(e)
    return new Promise((resolve) => {
      setTimeout(resolve, rippleDuration * .5)
    })
  }

  return (
    <Box
      onMouseDown={(e) => {
        handleRippleStart(e)
      }}
      onMouseUp={async (e) => {
        // wait for ripple to complete
        await handleRippleStop(e)
        if (props.onClick) { props.onClick() }
      }}
      onMouseOver={props.onMouseOver}
      sx={{
        margin: 0,
        padding: 0,
        display: "inline-block",
        cursor: "pointer"
      }}
    >
      <GradientBox
        gradient={background ?? "linear-gradient(lightgrey, lightgrey)"}
        styles={{
          borderWidth: 4, // default value
          borderRadius: 10, // default value
          background: styles?.background ?? defaultBKColor,
          ...GBOptional?.styles
        }}
      >
        <ButtonBase 
          sx={{ 
            display: "block", 
            padding: "5px", // default value
            '&& .MuiTouchRipple-rippleVisible': {
              animationDuration: rippleDuration + 'ms',
            },
            ...styles
          }}
          touchRippleRef={touchRippleRef}
        >
          {props.children}
        </ButtonBase>
      </GradientBox>
    </Box>
  )
}
