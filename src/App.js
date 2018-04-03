import React, { Component } from 'react';
import './App.css';

import { BLINKER } from './lib/GameOfLife/Data';
import { step } from './lib/GameOfLife/Game';



class App extends Component {
  render() {
    console.log(step(BLINKER))   
    
    return (
      <div className="app">
      </div>
    );
  }
}

export default App;
