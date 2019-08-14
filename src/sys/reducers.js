// @flow

import type { Sys, SysActions } from './actions';

export default (state: Sys = { path: [], files: [], folders: [] }, action: SysActions): Sys => {
  switch (action.type) {
    case 'UPDATE_FILES':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
