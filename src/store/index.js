// @flow
import { applyMiddleware, createStore as _createStore } from 'redux';

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text]);
    default:
      return state;
  }
}

let createStore;

if (process.env.NODE_ENV === 'development') {
  const logger = require('redux-logger');
  createStore = () => _createStore(todos, applyMiddleware(logger));
} else {
  createStore = () => _createStore(todos);
}

export const store = createStore();
