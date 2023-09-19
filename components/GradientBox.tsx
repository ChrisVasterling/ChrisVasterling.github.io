import { Box } from '@mui/material'
import React, { CSSProperties, useEffect, useRef, useState } from 'react'


interface IGradientBoxRequired {
  children: JSX.Element | JSX.Element[] | string
  gradient: string
}

// Comes from https://stackoverflow.com/questions/41285211/overriding-interface-property-type-defined-in-typescript-d-ts-file
type Modify<T, R> = Omit<T, keyof R> & R;
type GBCssProperties = Modify<CSSProperties, {
  borderRadius?: number | number[],
  borderWidth?: number | number[]
}>

export interface IGradientBoxOptional {
  styles?: GBCssProperties,
}

export default function GradientBox(props: IGradientBoxOptional & IGradientBoxRequired): JSX.Element {
  // So long as borderWidth is less than borderRadius, the inside will have rounded borders
  const { styles, gradient } = props;

  const container = useRef<{offsetHeight: number, offsetWidth: number}>();

  const [backgroundSize, setBackgroundSize] = useState([0, 0])


  const NormalizeToArray = (value: number | number[], size: number): number[] => {
    // Could be expanded to turn [5, 10] into [5, 10, 5, 10] to offer more ease-of-use

    if (Array.isArray(value)) {
      // If already an array, return it
      return value
    } else {
      // Otherwise, fill an array with the individual value
      return new Array(size).fill(value, 0, size)
    }
  }

  const HideInnerRadius = (index: number): boolean => {
    // Handled edge cases where the inner radius needs to be hidden 
    // (such as when an adjascent border is misson)
    // This appears to work but may not cover every case
    return (
      (borderWidths.at(index - 1) ?? 0) <= 0 || 
      (borderWidths.at(index) ?? 0) <= 0
    )
  }
  
  
  const borderRadiuses = NormalizeToArray(styles?.borderRadius ?? 0, 4) 
  const borderWidths = NormalizeToArray(styles?.borderWidth ?? 0, 4);
  const innerRadiuses = borderRadiuses.map((radius: number, index: number) => {
    return radius - borderWidths[index]
  })
  
  useEffect(() => {
    if (container.current !== undefined) {
      setBackgroundSize([
        container.current.offsetWidth,
        container.current.offsetHeight,
      ])
    }
  }, [container.current])

  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        borderTopLeftRadius: borderRadiuses[0] + "px",
        borderTopRightRadius: borderRadiuses[1] + "px",
        borderBottomRightRadius: borderRadiuses[2] + "px",
        borderBottomLeftRadius: borderRadiuses[3] + "px",
        margin: styles?.margin ?? "0px",
      }}
      ref={container}
    >
      <Box
        sx={{
          borderImage: gradient + " " + borderWidths.join(" "),
          borderStyle: "solid",
          borderTopWidth: borderWidths[0] + "px",
          borderRightWidth: borderWidths[1] + "px",
          borderBottomWidth: borderWidths[2] + "px",
          borderLeftWidth: borderWidths[3] + "px",
          position: "relative",
          height: "100%",
          width: "100%",
          background: styles?.background,
          backgroundSize: backgroundSize[0] + "px " + backgroundSize[1] + "px",
        }}
      >
        <Box>
          {props.children}
        </Box>
        {/* Only display when the box dimmensions are available */}
        {container.current !== undefined && (
          <Box>
            {/* Top Left */}
            <Box sx={{
              width: innerRadiuses[0] + "px",
              height: innerRadiuses[0] + "px",
              background: gradient,
              position: "absolute",
              top: "0px",
              left: "0px",
              backgroundSize: backgroundSize[0] + "px " + backgroundSize[1] + "px",
              backgroundPosition: -borderWidths[3] + "px " + -borderWidths[0] + "px",
              maskImage: "radial-gradient(" + 2 * innerRadiuses[0] + "px circle at 100% 100%, transparent 50%, black 51%)",
              visibility: HideInnerRadius(0) ? "hidden" : "visible"
            }}/>

            {/* Top Right */}
            <Box sx={{
              width: innerRadiuses[1] + "px",
              height: innerRadiuses[1] + "px",
              background: gradient,
              position: "absolute",
              top: "0px",
              right: "0px",
              backgroundSize: backgroundSize[0] + "px " + backgroundSize[1] + "px",
              backgroundPosition: "calc(100% + " + borderWidths[1] + "px) " + -borderWidths[0] + "px",
              maskImage: "radial-gradient(" + 2 * innerRadiuses[1] + "px circle at 0% 100%, transparent 50%, black 51%)",
              visibility: HideInnerRadius(1) ? "hidden" : "visible"
            }}/>

            {/* Bottom Right */}
            <Box sx={{
              width: innerRadiuses[2] + "px",
              height: innerRadiuses[2] + "px",
              background: gradient,
              position: "absolute",
              bottom: "0px",
              right: "0px",
              backgroundSize: backgroundSize[0] + "px " + backgroundSize[1] + "px",
              backgroundPosition: "calc(100% + " + borderWidths[1] + "px) " + " calc(100% + " + borderWidths[2] + "px)",
              maskImage: "radial-gradient(" + 2 * innerRadiuses[2] + "px circle at 0% 0%, transparent 50%, black 51%)",
              visibility: HideInnerRadius(2) ? "hidden" : "visible"
            }}/>

            {/* Bottom Left */}
            <Box sx={{
              width: innerRadiuses[3] + "px",
              height: innerRadiuses[3] + "px",
              background: gradient,
              position: "absolute",
              bottom: "0px",
              left: "0px",
              backgroundSize: backgroundSize[0] + "px " + backgroundSize[1] + "px",
              backgroundPosition: -borderWidths[3] + "px " + " calc(100% + " + borderWidths[2] + "px)",
              maskImage: "radial-gradient(" + 2 * innerRadiuses[3] + "px circle at 100% 0%, transparent 50%, black 51%)",
              visibility: HideInnerRadius(3) ? "hidden" : "visible"
            }}/>
          </Box>
        )}
      </Box>
    </Box>
  )
}
