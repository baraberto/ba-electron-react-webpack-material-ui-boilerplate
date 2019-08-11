// @flow

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Post from './Post';
import { fetchPosts } from './actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const PostList = () => {
  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, []);
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={2}>
      {posts.map(({ title, body, userId }) => (
        <Grid key={title} item>
          <Post body={body} title={title} userId={userId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;
