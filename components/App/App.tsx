import React from 'react'
import { HashRouter } from 'react-router-dom'
import Router from '../../pages/router'
import Layout from '../Layout'
import './App.css'

export default function App (props: any): JSX.Element {
  return (
    <>
      <HashRouter>
        <Layout />
        <Router />
      </HashRouter>
    </>
  )
}
