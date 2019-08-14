// @flow
import { combineReducers } from 'redux';
import posts from './posts/reducers';
import users from './users/reducers';
import sys from './sys/reducers';
import type { UserActions } from './users/actions';
import type { PostsActions } from './posts/actions';
import type { SysActions } from './sys/actions';

type Actions = UserActions | PostsActions | SysActions;

const reducers = { posts, users, sys };

export default combineReducers<typeof reducers, Actions>({ posts, users, sys });
