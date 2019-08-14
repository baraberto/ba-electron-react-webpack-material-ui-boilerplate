// @flow
import type { Dispatch } from 'redux';

export type PostType = {
  title: string,
  body: string,
  userId: string,
};

type FetchPostsAction = {
  type: 'FETCH_POSTS',
  payload: Array<PostType>,
};

export const fetchPosts = () => async (dispatch: Dispatch<FetchPostsAction>) => {
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
