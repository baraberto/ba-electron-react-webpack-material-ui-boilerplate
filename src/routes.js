import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import ReactLogo from './components/ReactLogo';
import Posts from './posts';
import UserList from './users/UserList';
import Sys from './sys';

const Routes = () => (
  <Fragment>
    <Route exact path="/" component={ReactLogo} />
    <Route path="/posts" component={Posts} />
    <Route path="/users" component={UserList} />
    <Route path="/sys" component={Sys} />
  </Fragment>
);

export default Routes;
