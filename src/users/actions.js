// @flow
import type { Dispatch } from 'redux';

type FetchUsersAction = {
  type: 'FETCH_USERS',
  payload: Array<UserType>,
};

type FetchUserAction = {
  type: 'FETCH_USER',
  payload: UserType,
};

type LoadingAction = {
  type: 'LOADING_USER',
  payload: { id: number },
};

export type UserActions = FetchUsersAction | FetchUserAction | LoadingAction;

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

export const fetchUsers = () => async (dispatch: Dispatch<FetchUsersAction>) => {
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

export const fetchUser = (id: number) => async (
  dispatch: Dispatch<FetchUserAction | LoadingAction>,
) => {
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
