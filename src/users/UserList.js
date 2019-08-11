// @flow
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import orderBy from 'lodash/orderBy';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';

import { fetchUsers } from './actions';

const headRows = [
  { id: 'username', numeric: false, disablePadding: true, label: 'Utilizador' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Nome' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'id', numeric: true, disablePadding: false, label: 'ID' },
];

type UsersTableHeadProps = {
  classes: {
    visuallyHidden: string,
  },
  order: 'asc' | 'desc',
  orderKey: 'username' | 'name' | 'email' | 'id',
  onRequestSort: Function,
};

const UsersTableHead = ({ classes, order, orderKey, onRequestSort }: UsersTableHeadProps) => {
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headRows.map(({ id, numeric, disablePadding, label }) => (
          <TableCell
            key={id}
            align={numeric ? 'right' : 'left'}
            padding={disablePadding ? 'none' : 'default'}
            sortDirection={orderKey === id ? order : false}
          >
            <TableSortLabel
              active={orderKey === id}
              direction={order}
              onClick={createSortHandler(id)}
            >
              {label}
              {orderKey === id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'ordenado descendente' : 'ordenado ascendente'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const EnhancedTableToolbar = () => {
  const classes = useToolbarStyles();
  return (
    <Toolbar className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          Utilizadores
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const UserTable = () => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderKey, setOrderBy] = React.useState('id');

  const dispatch = useDispatch();

  const users = useSelector(state => state.users);

  const sortedUsers = orderBy(users, [orderKey], [order]);

  useEffect(() => {
    if (isEmpty(users)) {
      dispatch(fetchUsers());
    }
  }, []);

  const handleRequestSort = (event, property) => {
    const isDesc = orderKey === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <UsersTableHead
              classes={classes}
              order={order}
              orderKey={orderKey}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {sortedUsers.length ? (
                sortedUsers.map(({ name, username, id, email }, index) => (
                  <TableRow hover tabIndex={-1} key={id}>
                    <TableCell
                      component="th"
                      id={`enhanced-table-checkbox-${index}`}
                      scope="row"
                      padding="none"
                    >
                      {username}
                    </TableCell>
                    <TableCell align="right">{name}</TableCell>
                    <TableCell align="right">{email}</TableCell>
                    <TableCell align="right">{id}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
};

export default UserTable;
