import React, { Component } from 'react'

export default class Counter extends Component {
    constructor() {
        super();
        this.state = {
            count: 0
        };
    }

    Incrementar = () => {
        this.setState((prevState) => ({
            count: prevState.count + 1
        }));
    }

    Decrementar = () => {
        this.setState((prevState) => ({
            count: prevState.count - 1
        }));
    }

    Reiniciar = () => {
        this.setState({ count: 0 });
    }

    render() {
        return (
            <div className='counter-container'>
                <h1>Contador</h1>
                <div className='counter-display'>{this.state.count}</div>
                <div className='button-container'>
                    <button onClick={this.Incrementar} className='button'>Incrementar</button>
                    <button onClick={this.Decrementar} className='button'>Decrementar</button>
                    <button onClick={this.Reiniciar} className='button'>Reiniciar</button>
                </div>
            </div>
        );
    }
}
