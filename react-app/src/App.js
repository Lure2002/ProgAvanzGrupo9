import './App.css';
import React, { Component } from 'react'
import Counter from './Counter';
import Calculator from './Calculator';

const screens = {
  COUNTER: 1,
  CALCULATOR: 2
};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentScreen: screens.COUNTER
    };
  }
  render() {
    return (
      <div className="App">
        <div className="button-container">
          <button className="button" onClick={() => {this.setState({currentScreen : screens.COUNTER})}}>Contador</button>
          <button className="button" onClick={() => {this.setState({currentScreen : screens.CALCULATOR})}}>Calculadora</button>
        </div>
        {this.state.currentScreen === screens.COUNTER && (<Counter/>)}
        {this.state.currentScreen === screens.CALCULATOR && (<Calculator/>)}
      </div>
    )
  }
}