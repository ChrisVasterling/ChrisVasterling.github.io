import React from 'react';
import { Box, type SxProps } from '@mui/material';

export interface IGradientText {
  children: string
  gradient: string
  styles?: SxProps
  textShadow?: string
}

export default function GradientText (props: IGradientText): JSX.Element {
  const { gradient, styles, textShadow } = props;
  return (
    <Box
      sx={{
        background: gradient,
        backgroundClip: 'text',
        color: 'transparent',
        display: 'inline-block',
        filter: textShadow !== undefined ? `drop-shadow(${textShadow})` : '',
        ...styles
      }}
    >
      {props.children}
    </Box>
  );
}
