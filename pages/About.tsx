import React from 'react'
import { Link } from 'react-router-dom'

export default function (props: any): JSX.Element {
  return (
    <>
      <Link to={"/projects"}>Link to Projects</Link>
    </>
  )
}