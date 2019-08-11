// @flow
import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';

const drawerWidth = {
  open: 240,
  close: 60,
};

const theme = createMuiTheme({
  drawerWidth,
  status: {
    danger: orange[500],
  },
});

export default theme;
