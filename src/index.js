// @flow
import React from 'react';
import './assets/css/index.css';
import { render } from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MemoryRouter as Router } from 'react-router';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import theme from './common/theme';
import Fonts from './common/Fonts';
import App from './components/App';
import reducers from './reducers';

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div');

root.id = 'root';
// $FlowFixMe
document.body.appendChild(root);

const store = createStore(reducers, applyMiddleware(thunk));

const MainApp = () => (
  <ThemeProvider theme={theme}>
    <Fonts />
    <CssBaseline />
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ThemeProvider>
);

// Now we can render our application into it
// $FlowFixMe
render(<MainApp />, document.getElementById('root'));
