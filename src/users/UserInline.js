// @flow

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { fetchUser } from './actions';

const UserInline = ({ id }: { id: number }) => {
  const dispatch = useDispatch();

  const users = useSelector(state => state.users);
  useEffect(() => {
    if (users[id] === undefined) {
      dispatch(fetchUser(id));
    }
  }, [id]);

  return <Typography>{(users[id] && users[id].username) || id}</Typography>;
};

export default UserInline;
