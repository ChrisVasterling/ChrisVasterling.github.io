import { Box, styled } from '@mui/material';
import React, { type CSSProperties, useEffect, useRef, useState, memo } from 'react';

interface IGradientBoxRequired {
  children: JSX.Element | JSX.Element[] | string
  gradient: string
}

// Comes from https://stackoverflow.com/questions/41285211/overriding-interface-property-type-defined-in-typescript-d-ts-file
type Modify<T, R> = Omit<T, keyof R> & R;
type GradientBoxCssProperties = Modify<CSSProperties, {
  borderRadius?: number | number[]
  borderWidth?: number | number[]
}>;

export interface IGradientBoxOptional {
  styles?: GradientBoxCssProperties
}

interface IGradientBoxInnerCorner {
  innerRadius: number
  minBackgroundDimension: number
  background: string
  backgroundSize: number[]
  borderWidths: number[]
  hidden: boolean
  position: string | 'TL' | 'TR' | 'BR' | 'BL'
  [key: string]: any
}

const GradientBoxInnerCorner = memo(function GradientBoxInnerCorner (props: IGradientBoxInnerCorner): JSX.Element {
  const { innerRadius, minBackgroundDimension, background, backgroundSize, borderWidths, hidden, position } = props;

  let cornerSpecificProps: CSSProperties;
  if (position === 'TL') {
    cornerSpecificProps = {
      backgroundPosition: `${-borderWidths[3]}px ${-borderWidths[0]}px`,
      maskImage: `radial-gradient(${Math.min(minBackgroundDimension, 2 * innerRadius)}px circle at 100% 100%, transparent 50%, black 51%)`,
      top: '0px',
      left: '0px'
    };
  } else if (position === 'TR') {
    cornerSpecificProps = {
      backgroundPosition: `calc(100% + ${borderWidths[1]}px) ${-borderWidths[0]}px`,
      maskImage: `radial-gradient(${Math.min(minBackgroundDimension, 2 * innerRadius)}px circle at 0% 100%, transparent 50%, black 51%)`,
      top: '0px',
      right: '0px'
    };
  } else if (position === 'BR') {
    cornerSpecificProps = {
      backgroundPosition: `calc(100% + ${borderWidths[1]}px) calc(100% + ${borderWidths[2]}px)`,
      maskImage: `radial-gradient(${Math.min(minBackgroundDimension, 2 * innerRadius)}px circle at 0% 0%, transparent 50%, black 51%)`,
      bottom: '0px',
      right: '0px'
    };
  } else if (position === 'BL') {
    cornerSpecificProps = {
      backgroundPosition: `${-borderWidths[3]}px calc(100% + ${borderWidths[2]}px)`,
      maskImage: `radial-gradient(${Math.min(minBackgroundDimension, 2 * innerRadius)}px circle at 100% 0%, transparent 50%, black 51%)`,
      bottom: '0px',
      left: '0px'
    };
  } else {
    return <></>;
  }

  const Corner = styled('div', {
    // pass all props to the div
    shouldForwardProp: () => true
  })({
    width: `${innerRadius}px`,
    height: `${innerRadius}px`,
    maxWidth: `${minBackgroundDimension / 2}px`,
    maxHeight: `${minBackgroundDimension / 2}px`,
    background,
    position: 'absolute',
    visibility: hidden ? 'hidden' : 'visible',
    ...cornerSpecificProps
  });

  return (
    <Corner
      style={{
        // For styles that could change often (such as on resize), add them to inline styles
        backgroundSize: `${backgroundSize[0]}px ${backgroundSize[1]}px`
      }}
    />
  );

  // Potential problem, on resize many class names are generated and added to <head> because backgroundSize changes a lot
  // return (
  //   <Box sx={{
  //     width: `${innerRadius}px`,
  //     height: `${innerRadius}px`,
  //     maxWidth: `${minBackgroundDimension / 2}px`,
  //     maxHeight: `${minBackgroundDimension / 2}px`,
  //     background,
  //     position: 'absolute',
  //     backgroundSize: `${backgroundSize[0]}px ${backgroundSize[1]}px`,
  //     visibility: hidden ? 'hidden' : 'visible',
  //     ...cornerSpecificProps
  //   }}/>
  // );
}, (oldProps: IGradientBoxInnerCorner, newProps: IGradientBoxInnerCorner) => {
  // If props aren't changing, use a memoized version of a corner
  // return true if the same, false if different
  let same = true;

  const keys = Object.keys(oldProps);
  for (let i = 0; i < keys.length; i++) {
    if (Array.isArray(oldProps[keys[i]])) {
      // compare arrays
      for (let k = 0; k < oldProps[keys[i]].length && same; k++) {
        same = oldProps[keys[i]][k] === newProps[keys[i]][k];
      }
    } else {
      // compare primitives
      same = Object.is(oldProps[keys[i]], newProps[keys[i]]);
    }

    // something isn't the same, we should exit early
    if (!same) {
      break;
    }
  }
  // console.log(same);

  return same;
});

export default function GradientBox (props: IGradientBoxOptional & IGradientBoxRequired): JSX.Element {
  // So long as borderWidth is less than borderRadius, the inside will have rounded borders
  const { styles, gradient } = props;

  const container = useRef<{ offsetHeight: number, offsetWidth: number }>();

  const [backgroundSize, setBackgroundSize] = useState([0, 0]);
  const [minBackgroundDimension, setMinBackgroundDimension] = useState<number>(0);

  const NormalizeToArray = (value: number | number[], size: number): number[] => {
    // Could be expanded to turn [5, 10] into [5, 10, 5, 10] to offer more ease-of-use

    if (Array.isArray(value)) {
      // If already an array, return it
      return value;
    } else {
      // Otherwise, fill an array with the individual value
      return new Array(size).fill(value, 0, size);
    }
  };

  const HideInnerRadius = (index: number): boolean => {
    // Handled edge cases where the inner radius needs to be hidden
    // (such as when an adjascent border is misson)
    // This appears to work but may not cover every case
    return (
      (borderWidths.at(index - 1) ?? 0) <= 0 ||
      (borderWidths.at(index) ?? 0) <= 0
    );
  };

  const handleWindowResize = (event: Event): void => {
    // box contents may have wrapped on a window resize
    if (container.current !== undefined) {
      if (container.current.offsetWidth !== backgroundSize[0] ||
          container.current.offsetHeight !== backgroundSize[1]) {
        // As a result of resize, one of the dimensions changed so update it
        setBackgroundSize([
          container.current.offsetWidth,
          container.current.offsetHeight
        ]);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  const defaultBorderRadius = 5;
  const defaultBorderWidth = 2;
  const borderRadiuses = NormalizeToArray(styles?.borderRadius ?? defaultBorderRadius, 4);
  const borderWidths = NormalizeToArray(styles?.borderWidth ?? defaultBorderWidth, 4);
  const innerRadiuses = borderRadiuses.map((radius: number, index: number) => {
    return Math.min(
      radius - borderWidths[index],
      minBackgroundDimension / 2 - borderWidths[index]
    );
  });

  useEffect(() => {
    if (container.current !== undefined) {
      setBackgroundSize([
        container.current.offsetWidth,
        container.current.offsetHeight
      ]);
      setMinBackgroundDimension(
        Math.min(container.current.offsetWidth, container.current.offsetHeight)
      );
    }
  }, [container.current]);

  return (
    <Box
      sx={{
        display: 'block',
        alignSelf: 'baseline',
        overflow: 'hidden',
        borderTopLeftRadius: `${borderRadiuses[0]}px`,
        borderTopRightRadius: `${borderRadiuses[1]}px`,
        borderBottomRightRadius: `${borderRadiuses[2]}px`,
        borderBottomLeftRadius: `${borderRadiuses[3]}px`,
        margin: styles?.margin ?? '0px',
        // hacky solution to fix issue with inner corner appearing after parent is displayed
        // by hiding until the parent has rendered (and got dimmensions) once
        visibility: container.current === undefined ? 'hidden' : 'visible'
      }}
      ref={container}
    >
      <Box
        sx={{
          borderImage: gradient + ' ' + borderWidths.join(' '),
          boxSizing: 'border-box',
          borderStyle: 'solid',
          borderTopWidth: `${borderWidths[0]}px`,
          borderRightWidth: `${borderWidths[1]}px`,
          borderBottomWidth: `${borderWidths[2]}px`,
          borderLeftWidth: `${borderWidths[3]}px`,
          position: 'relative',
          height: '100%',
          width: '100%',
          background: styles?.background,
          // causes many emotion class names to be generated on resize
          backgroundSize: `${backgroundSize[0]}px ${backgroundSize[1]}px`
        }}
      >
        <Box>
          {props.children}
        </Box>
        {/* Only display when the box dimmensions are available */}
        {container.current !== undefined && (
          <Box>
            {['TL', 'TR', 'BR', 'BL'].map((pos, index) => {
              return (
                <GradientBoxInnerCorner
                  key={index}
                  background={gradient}
                  innerRadius={innerRadiuses[index]}
                  minBackgroundDimension={minBackgroundDimension}
                  backgroundSize={backgroundSize}
                  borderWidths={borderWidths}
                  position={pos}
                  hidden={HideInnerRadius(index)}
                />
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}
