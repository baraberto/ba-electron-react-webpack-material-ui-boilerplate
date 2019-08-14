// @flow
import React, { useEffect, useState } from 'react';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import { getPreview, genHash } from './utils';
import type { FileAtributes } from './actions';

const imageSizes = {
  small: {
    width: 128,
    height: 128,
  },
  medium: {
    width: 192,
    height: 192,
  },
  large: {
    width: 256,
    height: 256,
  },
};

const usePreviewStyles = makeStyles(() => ({
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  ...imageSizes,
}));

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
}));

type PreviewProps = {
  imageSize: $Keys<typeof imageSizes>,
  path: string,
  mime?: string,
  modified: number,
  name: string,
  ext?: string,
};

const Preview = ({ path, mime, modified, name, imageSize, ext }: PreviewProps) => {
  const [src, setSrc] = useState(null);
  const classes = usePreviewStyles();
  useEffect(() => {
    if (mime && mime.includes('image') && ext) {
      const hash = genHash({ path, modified, imageSize });
      const { width, height } = imageSizes[imageSize];
      const getImage = async () => {
        const image = await getPreview(path, ext, hash, width, height);
        setSrc(image);
      };
      getImage();
    }
  }, [path, modified, imageSize]);

  return (
    <ButtonBase className={classes[imageSize]}>
      {src ? <img className={classes.img} alt={`imagem ${name}`} src={src} /> : <FileIcon />}
    </ButtonBase>
  );
};

const File = ({
  size,
  modified,
  createdDate,
  modifiedDate,
  path,
  mime,
  name,
  imageSize,
  ext,
}: FileAtributes & { imageSize: $Keys<typeof imageSizes> }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <Preview
              path={path}
              mime={mime}
              modified={modified}
              name={name}
              imageSize={imageSize}
              ext={ext}
            />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {createdDate.toLocaleDateString()}
                </Typography>

                <Typography variant="body2" color="textSecondary">
                  {modifiedDate.toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{size}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default File;
