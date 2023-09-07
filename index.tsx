import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/App/App'

const rootEle = document.getElementById("root")

if (rootEle !== null) {
  const root = createRoot(rootEle)
  root.render(
    <>
    <App />
    </>
  )
}