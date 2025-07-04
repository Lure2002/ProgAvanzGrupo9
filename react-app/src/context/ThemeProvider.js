import React, { Component } from 'react';
import ThemeContext from './ThemeContext';

const light = {
    mode: 'light',
    background: '#f5f5f5',
    card: '#ffffff',
    text: '#1a1a1a',
    primary: '#4caf50',
    muted: '#777',
    prioridad: {
        alta: '#d32f2f',
        media: '#fbc02d',
        baja: '#388e3c'
    }
};

const dark = {
    mode: 'dark',
    background: '#0e0e1a',
    card: '#1e1e2e',
    text: '#ffffff',
    primary: '#4caf50',
    muted: '#aaaaaa',
    prioridad: {
        alta: '#ef9a9a',
        media: '#fff59d',
        baja: '#a5d6a7'
    }
};

export class ThemeProvider extends Component {
    constructor() {
        super();
        this.state = {
            theme: dark
        };
    }

    toggleTheme = () => {
        this.setState(({ theme }) => ({
            theme: theme.mode === 'dark' ? light : dark
        }));
    };

    render() {
        return (
            <ThemeContext.Provider
                value={{
                    theme: this.state.theme,
                    toggleTheme: this.toggleTheme
                }}
            >
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}