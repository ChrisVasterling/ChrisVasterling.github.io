import React from 'react'
import { HashRouter } from 'react-router-dom'
import Router from '../pages/router'
import Button from './Button'

export default function App (props: any): JSX.Element {
  return (
    <>
      <h1>⚠️Under Construction⚠️</h1>
      <span>- Chris Vasterling</span>
      <hr />
      {/* Quick / Dirty Linking */}
      <a href="./about">
        <Button>About</Button>
      </a>
      <br />
      <HashRouter>
        <Router />
      </HashRouter>
    </>
  )
}
