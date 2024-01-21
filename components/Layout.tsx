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
  const scrollInfo = useScroll();
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
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          backdropFilter: 'blur(10px)',
          boxShadow: `0px -5px 10px 0px ${scrollInfo.position[1] === 0 ? 'transparent' : 'black'}`,
          backgroundColor: () => {
            // console.log(DeviceTypes[device]);
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
            py: scrollInfo.position[1] > 0 ? `${Math.max(5, 15 - scrollInfo.position[1])}px` : '15px',
            transition: `all ${scrollInfo.direction === 'up' ? 0 : 150}ms ease-in-out`,
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
