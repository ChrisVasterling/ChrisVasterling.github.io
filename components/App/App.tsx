import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Router from '../../pages/router';
import Layout from '../Layout';
import './App.css';

export default function App (props: any): JSX.Element {
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <>
      <HashRouter>
        <Layout onHeaderHeight={setHeaderHeight}/>
        <div style={{
          paddingTop: `${headerHeight}px`
        }}>
          <Router />
        </div>
      </HashRouter>
    </>
  );
}
