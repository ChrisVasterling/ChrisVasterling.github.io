import React from "react"
import { useNavigate } from 'react-router-dom'
import Button, { ButtonTypes } from "../components/Button"

export default function Home(props: any) {

  const navigate = useNavigate();
 
  return (
    <>
      <h1>⚠️Under Construction⚠️</h1>
      <span>- Chris Vasterling</span>
      <hr />
      <Button
        background={"linear-gradient(45deg, purple, blue)"}
        type={ButtonTypes.Secondary}
        onClick={() => {
          navigate("/about")
        }}
      >
        About
      </Button>
      <br />
      <br />
      <Button
        type={ButtonTypes.Secondary}
        background={
          `
          linear-gradient(
            45deg, 
            blue,
            orange,
            red
          )
          `
        }
        
        propsGB={{
          styles: {
            borderWidth: 5,
            borderRadius: 10,
            padding: "50px",
          }
        }}
        
        onClick={() => {
          navigate('/projects')
        }}
      >
        <span style={{color: "red"}}>Special Button (/projects)</span>
      </Button>
      <br />
    </>
  )
}