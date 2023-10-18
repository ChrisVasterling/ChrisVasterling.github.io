import React, { createContext, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Router from '../../pages/router';
import Layout from '../Layout';
import './App.css';

export const HeaderHeightContext = createContext(0);

export default function App (props: any): JSX.Element {
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <>
      <HashRouter>
        <Layout onHeaderHeight={setHeaderHeight}/>
        <HeaderHeightContext.Provider value={headerHeight}>
          <Router />
        </HeaderHeightContext.Provider>
      </HashRouter>
    </>
  );
}
