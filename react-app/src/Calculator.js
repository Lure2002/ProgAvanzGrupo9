import React, { Component } from 'react';

export default class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      result: ''
    };
  }

  handleClick = (value) => {
    if (value === '=') {
      try {
        // Evaluamos la expresión (con precaución)
        const evalResult = eval(this.state.input);
        this.setState({ result: evalResult.toString(), input: evalResult.toString() });
      } catch {
        this.setState({ result: 'Error' });
      }
    } else if (value === 'C') {
      this.setState({ input: '', result: '' });
    } else {
      this.setState({ input: this.state.input + value, result: '' });
    }
  };

  render() {
    return (
      <div className='calculator-container'>
        <h1>Calculadora</h1>
        <div className='calculator-display'>
          {this.state.result || this.state.input || '0'}
        </div>
        <br />
        <div className='buttons-calculator'>
          <button className='button' onClick={() => this.handleClick('7')}>7</button>
          <button className='button' onClick={() => this.handleClick('8')}>8</button>
          <button className='button' onClick={() => this.handleClick('9')}>9</button>
          <button className='button' onClick={() => this.handleClick('/')}>/</button>
          <br />
          <button className='button' onClick={() => this.handleClick('4')}>4</button>
          <button className='button' onClick={() => this.handleClick('5')}>5</button>
          <button className='button' onClick={() => this.handleClick('6')}>6</button>
          <button className='button' onClick={() => this.handleClick('*')}>*</button>
          <br />
          <button className='button' onClick={() => this.handleClick('1')}>1</button>
          <button className='button' onClick={() => this.handleClick('2')}>2</button>
          <button className='button' onClick={() => this.handleClick('3')}>3</button>
          <button className='button' onClick={() => this.handleClick('-')}>-</button>
          <br />
          <button className='button' onClick={() => this.handleClick('0')}>0</button>
          <button className='button' onClick={() => this.handleClick('.')}>.</button>
          <button className='button' onClick={() => this.handleClick('=')}>=</button>
          <button className='button' onClick={() => this.handleClick('+')}>+</button>
          <br />
          <button className='button' onClick={() => this.handleClick('C')}>C</button>
        </div>
      </div>
    );
  }
}
