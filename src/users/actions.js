// @flow
import type Dispatch from 'redux';

export const fetchUsers = () => async (dispatch: Dispatch) => {
  const res = await fetch('http://jsonplaceholder.typicode.com/users', {
    Headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  dispatch({
    type: 'FETCH_USERS',
    payload: data,
  });
};

export const fetchUser = (id: number) => async (dispatch: Dispatch) => {
  dispatch({ type: 'LOADING_USER', payload: { id } });
  const res = await fetch(`http://jsonplaceholder.typicode.com/users?id=${id}`, {
    Headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  dispatch({
    type: 'FETCH_USER',
    payload: data,
  });
};

export const loadingUser = (id: number) => ({ type: 'LOADING_USER', payload: { id } });
