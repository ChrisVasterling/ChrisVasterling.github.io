import React, { type CSSProperties, useRef } from 'react';
// import GradientBox, { IGradientBoxStyle } from './GradientBox'
import { Box, useTheme } from '@mui/material';
import GradientBox, { type IGradientBoxOptional } from './GradientBox';
import TouchRipple, { type TouchRippleActions } from '@mui/material/ButtonBase/TouchRipple';

export enum ButtonTypes {
  Primary,
  Secondary
}

export interface IButton {
  children: JSX.Element | JSX.Element[] | string
  type?: ButtonTypes
  background?: string
  gradientBoxStyles?: IGradientBoxOptional['styles'] // Manually change styles on gradient box
  styles?: CSSProperties
  containerStyles?: CSSProperties
  onClick?: () => void
  onMouseOver?: () => void
}

export default function Button (props: IButton): JSX.Element {
  const { type, background, gradientBoxStyles, styles, containerStyles } = props;

  const touchRippleRef = useRef<TouchRippleActions>(null);
  const theme = useTheme();
  const rippleDuration = theme.transitions.duration.complex * 2;

  // Default if no type is set
  let defaultBKColor: string | undefined;

  if (type === ButtonTypes.Primary) {
    defaultBKColor = background ?? 'lightgrey';
  } else if (type === ButtonTypes.Secondary) {
    defaultBKColor = 'white';
  }

  const handleRippleStart = (e: React.MouseEvent): void => {
    touchRippleRef?.current?.start(e);
  };

  const handleRippleStop = async (e: React.MouseEvent): Promise<void> => {
    touchRippleRef?.current?.stop(e);
    await new Promise((resolve) => {
      setTimeout(resolve, rippleDuration * 0.5);
    });
  };

  return (
    <Box
      onMouseDown={(e) => {
        handleRippleStart(e);
      }}
      onMouseUp={(e) => {
        // wait for ripple to complete
        const t = async (): Promise<void> => {
          await handleRippleStop(e);
          if (props.onClick != null) { props.onClick(); }
        };
        void t();
      }}
      onMouseOver={props.onMouseOver}
      onMouseOut={(e) => {
        const t = async (): Promise<void> => {
          await handleRippleStop(e);
        };
        void t();
      }}
      sx={{
        margin: 0,
        padding: 0,
        display: 'inline-block',
        cursor: 'pointer',
        ...containerStyles
      }}
    >
      <GradientBox
        gradient={background ?? 'linear-gradient(lightgrey, lightgrey)'}
        styles={{
          borderWidth: 4, // default value
          borderRadius: 10, // default value
          background: styles?.background ?? defaultBKColor,
          ...gradientBoxStyles
        }}
      >
        <Box
          sx={{
            display: 'inline-block',
            padding: '5px', // default value
            '&& .MuiTouchRipple-rippleVisible': {
              animationDuration: `${rippleDuration}ms`
            },
            // '&& .MuiTouchRipple-child': {
            //   backgroundClip: 'unset',
            //   background
            // },
            ...styles
          }}
        >
          <div style={{ position: 'relative', zIndex: 1 }}>
            {props.children}
          </div>
          <TouchRipple ref={touchRippleRef} />
        </Box>
      </GradientBox>
    </Box>
  );
}
