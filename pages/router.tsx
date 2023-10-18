import { Route, Routes } from 'react-router-dom';
import pagesData from './pagesData';
import React from 'react';

// Generate the routing components based off info in ./pagesData
// from: https://dev.to/kachiic/the-right-way-structure-your-react-router-1i3l
const Router = (): JSX.Element => {
  const pageRoutes = pagesData.map(({ path, title, element }) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  return <Routes>{pageRoutes}</Routes>;
};

export default Router;
