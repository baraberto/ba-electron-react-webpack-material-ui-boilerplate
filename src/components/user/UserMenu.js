// @flow
import React, { type Ref } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';

const ProfileMenu = ({
  userMenuAnchorEl,
  closeProfileMenu,
  menuId,
}: {
  userMenuAnchorEl: ?Ref<IconButton>,
  closeProfileMenu: () => void,
  menuId: string,
}) => (
  <Menu
    anchorEl={userMenuAnchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={menuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={Boolean(userMenuAnchorEl)}
    onClose={closeProfileMenu}
  >
    <MenuItem onClick={closeProfileMenu}>Profile</MenuItem>
    <MenuItem onClick={closeProfileMenu}>My account</MenuItem>
  </Menu>
);

export default ProfileMenu;
