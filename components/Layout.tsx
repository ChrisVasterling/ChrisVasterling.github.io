import React, { useContext, useEffect, useRef } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import Button, { ButtonTypes } from './Button';
import { Box, Stack } from '@mui/material';
import GradientText from './GradientText';
import { useLocation, useNavigate } from 'react-router-dom';
import { DeviceSizeContext, DeviceTypes } from './App/App';
import useScroll from '../hooks/useScroll';

export default function Layout (props: any): JSX.Element {
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollInfo = useScroll({ sensitivity: 100 });
  const navigate = useNavigate();
  const location = useLocation();
  const device = useContext(DeviceSizeContext);

  const handleHeaderResize = (entries: any): any => {
    for (const entry of entries) {
      props.onHeaderHeight(entry.contentRect.height);
    }
  };

  useEffect(() => {
    // if (headerRef?.current !== null) {
    //   props.onHeaderHeight(headerRef.current.offsetHeight);
    // }
    const ro = new ResizeObserver(handleHeaderResize);
    ro.observe(headerRef?.current ?? new Element());
    return () => {
      ro.disconnect();
    };
  }, [headerRef.current]);

  // Disable the layout on specific pages
  // const location = useLocation();
  // if (location.pathname == "/about") {
  //   return <></>
  // }

  // site-wide navigation goes here

  return (
    <>
      <Box
        ref={headerRef}
        sx={{
          position: 'fixed',
          top: (
            headerRef.current?.offsetHeight === null || scrollInfo.sensitive.position[1] === 0
              ? 0
              : `${scrollInfo.sensitive.direction === 'up' ? 0 : (headerRef.current?.offsetHeight ?? 0) * -1 - 1}px`
          ),
          transform: 'translate3d(0px, 0px, 0px)',
          transition: 'all 200ms ease-in-out',
          left: 0,
          width: '100%',
          zIndex: 100,
          backdropFilter: 'blur(10px)',
          // boxShadow: `0px -5px 10px 0px ${scrollInfo.position[1] === 0 ? 'transparent' : 'black'}`,
          backgroundColor: () => {
            // console.log(DeviceTypes[device]);
            // return 'transparent';
            switch (device) {
              case DeviceTypes.SmallMobile:
                return 'gray';
              case DeviceTypes.Mobile:
                return 'red';
              case DeviceTypes.Tablet:
                return 'orange';
              case DeviceTypes.Laptop:
                return 'yellow';
              case DeviceTypes.Desktop:
                return 'green';
              default:
                return 'purple';
            }
          }
        }}
      >
        <Stack
          direction={'row'}
          sx={{
            // Overall behavior is good. Seed to adjust logic for the py here
            // Currently the scroll behavior is a bit jaring.
            // Probably because adjusting the PY changes the element size making the entire page shift slightly.
            // the PY is also always determined by the scroll position
            /**
             * Desired behavior:
             * scroll down and header disappears
             * scroll back up and header is slimmer
             * scroll to the top and header is full size
             */
            py: '15px', // scrollInfo.position[1] > 0 ? `${Math.max(5, 15 - scrollInfo.position[1]) * 0 + 5}px` : '15px',
            transition: `all 200ms ease-in-out ${200}ms`,
            px: '15%',
            alignItems: 'center'
          }}
        >
          {location.pathname !== '/' && (
              <Button
                type={ButtonTypes.Primary}
                onClick={() => {
                  navigate('/');
                }}
                background="linear-gradient(37deg, red, blue)"
                styles={{
                  padding: '3px',
                  fontFamily: 'sans-serif',
                  fontSize: '.9em',
                  userSelect: 'none',
                  color: 'white'
                }}
                gradientBoxStyles={{
                  borderRadius: 7
                }}
                containerStyles={{
                  marginRight: '10px'
                }}
              >
                Home
              </Button>
          )}
          <GradientText
            gradient="black"
            styles={{
              fontSize: 30,
              fontFamily: 'sans-serif'
            }}
          >
            Chris Vasterling
          </GradientText>
          <Stack
            direction={'row'}
            spacing={2}
            sx={{
              flexGrow: 1,
              justifyContent: 'right'
            }}
          >
            <Button
              type={ButtonTypes.Primary}
              onClick={() => {
                navigate('/about');
              }}
              background="linear-gradient(37deg, red, blue)"
              styles={{
                padding: '10px',
                fontFamily: 'sans-serif',
                fontSize: '1.2em',
                userSelect: 'none',
                color: 'white'
              }}
              gradientBoxStyles={{
                borderRadius: 10
              }}
            >
              About
            </Button>
            <Button
              type={ButtonTypes.Primary}
              onClick={() => {
                navigate('/projects');
              }}
              background="linear-gradient(37deg, red, blue)"
              styles={{
                padding: '10px',
                fontFamily: 'sans-serif',
                fontSize: '1.2em',
                userSelect: 'none',
                color: 'white'
              }}
              gradientBoxStyles={{
                borderRadius: 10
              }}
            >
              Projects
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
