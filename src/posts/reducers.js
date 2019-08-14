// @flow

import type { PostType, PostsActions } from './actions';

export default (state: Array<PostType> = [], action: PostsActions): Array<PostType> => {
  switch (action.type) {
    case 'FETCH_POSTS':
      return action.payload;
    default:
      return state;
  }
};
