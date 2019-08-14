// @flow
import keyBy from 'lodash/keyBy';
import type { UserType } from './actions';

export default (
  state: { [number]: UserType } = {},
  action: { type: string, payload: Array<UserType> },
): { [number]: UserType } => {
  switch (action.type) {
    case 'FETCH_USERS':
      return { ...state, ...keyBy(action.payload, k => k.id) };
    case 'FETCH_USER':
      return { ...state, ...keyBy(action.payload, k => k.id) };
    case 'LOADING_USER':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
