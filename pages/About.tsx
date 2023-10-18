import React from 'react';
import { Link } from 'react-router-dom';
import GradientText from '../components/GradientText';
import HeaderSpacing from '../components/HeaderSpacing';

export default function About (props: any): JSX.Element {
  return (
    <>
      <HeaderSpacing />
      <Link to={'/projects'}>Link to Projects</Link>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={''} />
      <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet" />
      <div style={{
        fontSize: '80px',
        fontFamily: 'sans-serif',
        color: 'rgb(210, 210, 210)',
        background: 'rgb(40, 40, 40)',
        padding: '30px'
      }}
      >
        <span> Just a </span>
        <GradientText
          gradient={'linear-gradient(90deg, #fee3c5, #f2c280, #935f37, #5e3413, #bb6436)'}
          textShadow='-1px 1px 4px rgba(0, 0, 0, .4)'
          styles={{
            fontFamily: 'Permanent Marker'
          }}
        >
            Human
        </GradientText>
        <span> on </span>
        <GradientText
          gradient={'linear-gradient(90deg, #f2d880, #2e479f, #40af56)'}
          textShadow='-1px 1px 4px rgba(0, 0, 0, .4)'
          styles={{
            fontFamily: 'Permanent Marker'
          }}
        >
            Planet Earth
        </GradientText>
        </div>

    </>
  );
}
