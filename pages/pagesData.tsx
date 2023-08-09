import React from 'react'
import About from './About'
import { Link, useParams } from 'react-router-dom'

// TEMPORARY for basic route testing
function TestEle (props: any): JSX.Element {
  const params = useParams()
  return (
    <>
      <span>Project ID: {params?.projectId}</span>
    </>
  )
}

// A list of routes by patterns, and the associated component
const pagesData = [
  {
    path: "",
    title: "home",
    element: <span>Home</span>
  },
  {
    path: "about",
    title: "about",
    element: <About />
  },
  {
    path: "projects/:projectId",
    title: "projectID",
    element: <TestEle />
  },
  {
    path: "projects",
    title: "projects",
    element: <>
      <span>Projects</span>
      <br />
      <Link to={"/projects/12345"}>Link to Project 12345</Link>
      <br />
      <Link to={"./67890"}>Link to Project 67890</Link>
    </>
  },
  {
    path: "*",
    title: "404",
    element: <span>404 - Page Not Found</span>
  }
]

export default pagesData
