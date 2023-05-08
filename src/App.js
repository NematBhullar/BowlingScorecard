import './App.css';
import React from 'react';
import PlayerBoard from './PlayerBoard';

function App() {
  return (
    <div className='main-body'>
      <h1>Bowling Scorecard</h1>
      <div><PlayerBoard/></div>
  </div>
  )
}

export default App;
