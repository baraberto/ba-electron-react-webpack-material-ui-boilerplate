// @flow
import type Dispatch from 'redux';
type OnUserLogin = 'ON_USER_LOGIN';
type OnUserLogout = 'ON_USER_LOGOUT';
// type FetchLoginPending = 'FETCH_LOGIN_PENDING';
// type FetchLoginError = 'FETCH_LOGIN_ERROR';

// const FETCH_LOGIN_PENDING: FetchLoginPending = 'FETCH_LOGIN_PENDING';
const ON_USER_LOGIN: OnUserLogin = 'ON_USER_LOGIN';
const ON_USER_LOGOUT: OnUserLogout = 'ON_USER_LOGOUT';
// const FETCH_LOGIN_ERROR: FetchLoginError = 'FETCH_LOGIN_ERROR';

type UserType = {
  +username: string,
  +id: ?Number,
  +logged: boolean,
};

type LoginAcion = {
  type: OnUserLogin,
  payload: UserType,
};

type LogoutAction = {
  type: OnUserLogout,
};

type UserActions = LoginAcion | LogoutAction;

type LoginFormData = {|
  username: string,
  password: string,
|};

type Method = 'GET' | 'POST' | 'PUT';

export const fetchData = (
  url: string,
  success: Function,
  fail: Function,
  method?: Method = 'GET',
  data?: any,
) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(url, {
        method,
        Headers: {
          'Content-Type': 'application/json',
        },
        body: data && JSON.stringify(data, null, 2),
      });
      const r = await response.json();
      dispatch(success(r));
    } catch (e) {
      dispatch(fail(e));
    }
  };
};

const initialState: UserType = {
  username: 'Desconhecido',
  logged: false,
  id: null,
};

export const logUserSuccess = (payload: UserType): LoginAcion => ({ type: ON_USER_LOGIN, payload });

export const submitSignIn = (data: LoginFormData) =>
  fetchData('', () => {}, () => {}, 'POST', data);

export const currentUser = (state: UserType = initialState, action: UserActions): UserType => {
  if (action.type === ON_USER_LOGIN) {
    return action.payload;
  } else if (action.type === ON_USER_LOGOUT) {
    return { ...initialState };
  }
  return state;
};
