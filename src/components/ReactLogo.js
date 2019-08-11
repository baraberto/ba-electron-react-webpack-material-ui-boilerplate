// @flow
import '../assets/css/App.css';
import logo from '../assets/logo.svg';
import React from 'react';

const ReactLogo = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Editar <code>src/components/App.js</code> e salvar para actualizar.
      </p>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Aprender React
      </a>
    </header>
  </div>
);

export default ReactLogo;
