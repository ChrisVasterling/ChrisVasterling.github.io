import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button, { ButtonTypes } from '../components/Button';
import HeaderSpacing from '../components/HeaderSpacing';

export default function Home (props: any): JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <HeaderSpacing />
      <h1>⚠️Under Construction⚠️</h1>
      <span>- Chris Vasterling</span>
      <hr />
      <Button
        background={'linear-gradient(45deg, purple, blue)'}
        type={ButtonTypes.Secondary}
        styles={{
          padding: '10px'
        }}
        onClick={() => {
          navigate('/about');
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

        gradientBoxStyles={{
          borderWidth: 10,
          borderRadius: 50
        }}

        styles={{
          padding: '50px'
        }}

        onClick={() => {
          navigate('/projects');
        }}
      >
        <span style={{ color: 'red' }}>Special Button (/projects)</span>
      </Button>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </>
  );
}
