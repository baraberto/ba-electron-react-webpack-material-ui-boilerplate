// @flow
import type Dispatch from 'redux';

export const fetchPosts = () => async (dispatch: Dispatch) => {
  const res = await fetch('http://jsonplaceholder.typicode.com/posts', {
    Headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  dispatch({
    type: 'FETCH_POSTS',
    payload: data,
  });
};
