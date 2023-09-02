import React, { useState } from 'react'
import GradientBox from './GradientBox'

enum ButtonTypes {
  Primary,
  Secondary
}

export interface IButton {
  children: JSX.Element | JSX.Element[] | string,
  type: ButtonTypes
}

export default function Button(props: any): JSX.Element {
  return (
    <GradientBox
      gradient="linear-gradient(45deg, purple, blue)"
      padding={10}
      borderWidth={4}
      borderRadius={10}
      innerStyles={{
        backgroundColor: "white"
      }}
    >
      {props.children}
    </GradientBox>
  )
}
