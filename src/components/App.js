// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from './TopBar';
import MiniDrawer from './MiniDrawer';
import UserMenu from './user/UserMenu';
import Routes from '../routes';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(1),
  },
}));

const App = () => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const closeProfileMenu = () => setAnchorEl(null);
  const handleProfileMenuOpen = ev => setAnchorEl(ev.currentTarget);
  const menuId = 'user-profile-menu';
  return (
    <div className={classes.root}>
      <TopBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleProfileMenuOpen={handleProfileMenuOpen}
        menuId={menuId}
      />
      <MiniDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <div className={classes.content}>
        <Routes />
      </div>
      <UserMenu userMenuAnchorEl={anchorEl} closeProfileMenu={closeProfileMenu} menuId={menuId} />
    </div>
  );
};

export default App;
