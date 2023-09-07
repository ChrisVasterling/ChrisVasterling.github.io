import React from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import Button, { ButtonTypes } from "./Button";
import { Stack, Typography } from "@mui/material";
import GradientText from "./GradientText";

export default function Layout(props: any) {

  const navigate = useNavigate();
  
  // Disable the layout on specific pages
  // let location = useLocation();
  // if (location.pathname == "/about") {
  //   return <></>
  // }

  // site-wide navigation goes here

  return (
    <>
      <Stack 
        direction={"row"}
        sx={{
          px: "15%",
          py: "10px",
          alignItems: "center",
        }}
      >
        <GradientText
          gradient="black"
          styles={{
            fontSize: 30,
            fontFamily: "sans-serif"
          }}
        >
          Chris Vasterling
        </GradientText>
        <Stack 
          direction={"row"}
          spacing={2}
          sx={{
            flexGrow: 1,
            justifyContent: "right"
          }}
        >
          <Button type={ButtonTypes.Secondary}>About</Button>
          <Button type={ButtonTypes.Secondary}>Projects</Button>
        </Stack>
      </Stack>
    </>
  )
}