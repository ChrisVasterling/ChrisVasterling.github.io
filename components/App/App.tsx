import React, { createContext, useLayoutEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Router from '../../pages/router';
import Layout from '../Layout';
import './App.css';
import useMediaQuery from '@mui/material/useMediaQuery';

export enum DeviceTypes {
  Default, SmallMobile, Mobile, Tablet, Laptop, Desktop, BigScreen
}

export const HeaderHeightContext = createContext(0);
export const DeviceSizeContext = createContext<DeviceTypes>(DeviceTypes.Default);

export default function App (props: any): JSX.Element {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [currentDevice, setCurrentDevice] = useState<DeviceTypes>(DeviceTypes.Default);

  const isSmallMobile = useMediaQuery('screen and (max-width: 480px)');
  const isMobile = useMediaQuery('screen and (min-width: 480px)');
  const isTablet = useMediaQuery('screen and (min-width: 768px)');
  const isLaptop = useMediaQuery('screen and (min-width: 1024px)');
  const isDesktop = useMediaQuery('screen and (min-width: 1200px)');

  useLayoutEffect(() => {
    // Force rerender to correct device size before painting
    if (isSmallMobile) { setCurrentDevice(DeviceTypes.SmallMobile); }
    if (isMobile) { setCurrentDevice(DeviceTypes.Mobile); }
    if (isTablet) { setCurrentDevice(DeviceTypes.Tablet); }
    if (isLaptop) { setCurrentDevice(DeviceTypes.Laptop); }
    if (isDesktop) { setCurrentDevice(DeviceTypes.Desktop); }
  }, [isMobile,
    isTablet,
    isLaptop,
    isDesktop]);

  return (
    <>
      <HashRouter>
        <DeviceSizeContext.Provider value={currentDevice}>
          <Layout onHeaderHeight={setHeaderHeight}/>
          <HeaderHeightContext.Provider value={headerHeight}>
            <Router />
          </HeaderHeightContext.Provider>
        </DeviceSizeContext.Provider>
      </HashRouter>
    </>
  );
}
