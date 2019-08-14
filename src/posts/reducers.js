// @flow

import type { PostType } from './actions';

export default (
  state: Array<PostType> = [],
  action: { type: string, payload: Array<PostType> },
): Array<PostType> => {
  switch (action.type) {
    case 'FETCH_POSTS':
      return action.payload;
    default:
      return state;
  }
};
