import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import Button, { ButtonTypes } from './Button';
import { Box, Stack } from '@mui/material';
import GradientText from './GradientText';
import { useLocation, useNavigate } from 'react-router-dom';
import { DeviceSizeContext, DeviceTypes } from './App/App';

export default function Layout (props: any): JSX.Element {
  const headerRef = useRef<HTMLDivElement>(null);
  const [scrollAtTop, setScrollAtTop] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const device = useContext(DeviceSizeContext);

  const handleWindowScroll = (): void => {
    setScrollAtTop(window.scrollY === 0);
  };

  useLayoutEffect(() => {
    if (headerRef?.current !== null) {
      props.onHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [headerRef?.current]);

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);
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
          py: scrollAtTop ? '15px' : '5px',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          transition: 'all 150ms ease-in-out',
          backdropFilter: 'blur(10px)',
          boxShadow: `0px -5px 10px 0px ${scrollAtTop ? 'transparent' : 'black'}`,
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
