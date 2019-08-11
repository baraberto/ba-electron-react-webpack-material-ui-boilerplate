// @flow
import keyBy from 'lodash/keyBy';

export type UserType =
  | {
      id: number,
      name: string,
      username: string,
      email: string,
      address: addressType,
      phone: string,
      website: string,
      company: companyType,
    }
  | { id: number };

export type addressType = {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: {
    lat: string,
    lng: string,
  },
};

export type companyType = {
  name: string,
  catchPhrase: string,
  bs: string,
};

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
