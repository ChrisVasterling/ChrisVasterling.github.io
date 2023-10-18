import React, { useContext } from 'react';
import { HeaderHeightContext } from './App/App';

export default function HeaderSpacing (): JSX.Element {
  const headerHeight = useContext(HeaderHeightContext);
  return (
    <div style={{ height: headerHeight }}></div>
  );
}
