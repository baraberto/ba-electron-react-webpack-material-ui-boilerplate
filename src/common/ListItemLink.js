// @flow
import React, { type Element, type ElementType } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import SvgIcon from '@material-ui/core/SvgIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

type Props = {
  to: string,
  icon?: Element<typeof SvgIcon>,
  primary: ElementType,
  secondary?: ElementType,
};

const ListItemLink = ({ to, icon, primary, secondary }: Props) => {
  const renderLink = React.useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      React.forwardRef((itemProps, ref) => <RouterLink to={to} {...itemProps} innerRef={ref} />),
    [to],
  );

  return (
    <ListItem button component={renderLink}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText inset primary={primary} secondary={secondary} />
    </ListItem>
  );
};

export default ListItemLink;
