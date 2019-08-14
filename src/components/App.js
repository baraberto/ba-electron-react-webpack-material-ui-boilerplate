// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from './TopBar';
import MiniDrawer from './MiniDrawer';
import UserMenu from './user/UserMenu';
import Routes from '../routes';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  giveSpace: {
    top: theme.spacing(8),
    left: theme.spacing(8),
    position: 'absolute',
    width: `calc(100% - ${theme.spacing(8)}px)`,
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
      <UserMenu userMenuAnchorEl={anchorEl} closeProfileMenu={closeProfileMenu} menuId={menuId} />
      <div className={classes.giveSpace}>
        <Container>
          <Routes />
        </Container>
      </div>
    </div>
  );
};

export default App;
