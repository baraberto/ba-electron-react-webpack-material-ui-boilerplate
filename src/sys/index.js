// @flow

import React, { useEffect, useState } from 'react';
import kebabCase from 'lodash/kebabCase';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import Grid from '@material-ui/core/Grid';
import { changeFolder } from './actions';
import { getHomeDir, normalize } from './utils';
import File from './File';

type SysLocationType = Array<string>;

type SysProps = {
  sysLocation: SysLocationType,
  showHidden?: boolean,
};

const Location = ({
  sysLocation,
  breadNavigation,
}: {
  sysLocation: SysLocationType,
  breadNavigation: Function,
}) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {sysLocation.slice(1, -1).map((l, i) => (
        <Link key={`${l}${i}`} onClick={breadNavigation(i)} color="inherit">
          {l}
        </Link>
      ))}
      <Typography color="textPrimary">{sysLocation.slice(-1)[0]}</Typography>
    </Breadcrumbs>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1, 2),
  },
}));

const Folder = ({ folder, navigateTo }: { folder: string, navigateTo: (folder: string) => {} }) => (
  <ListItem button onClick={navigateTo(folder)}>
    <ListItemIcon>
      <FolderIcon />
    </ListItemIcon>
    <ListItemText id={kebabCase(folder)} primary={folder} />
  </ListItem>
);

const FolderList = ({ sysLocation, showHidden }: SysProps) => {
  const { files, folders } = useSelector(state => state.sys);
  const [activeLocation, setActiveLocation] = useState(sysLocation);
  const dispatch = useDispatch();
  const classes = useStyles();

  const breadNavigation = pos => e => {
    e.preventDefault();
    setActiveLocation(normalize(activeLocation.slice(0, pos + 2)));
  };

  const navigateTo = folder => () => {
    setActiveLocation(normalize([...activeLocation, folder]));
  };

  useEffect(() => {
    dispatch(changeFolder(activeLocation, showHidden));
  }, [activeLocation]);

  return (
    <div className={classes.root}>
      <Location sysLocation={activeLocation} breadNavigation={breadNavigation} />
      <Grid container spacing={6}>
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>
            <List dense>
              <Folder folder=".." navigateTo={navigateTo} />
              {folders.map(({ name }) => (
                <Folder key={name} folder={name} navigateTo={navigateTo} />
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={0} className={classes.paper}>
            {files.map(({ name, ...rest }) => (
              <File key={name} name={name} {...rest} imageSize="small" />
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

FolderList.defaultProps = {
  sysLocation: getHomeDir(),
  showHidden: false,
};

export default FolderList;
