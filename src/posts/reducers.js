// @flow

export type PostType = {
  title: string,
  body: string,
};

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
