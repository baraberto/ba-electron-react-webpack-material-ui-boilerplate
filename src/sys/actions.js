// @flow

import type { Dispatch } from 'redux';

import isString from 'lodash/isString';
import { readDir, getFileStats, type FileStats } from './utils';
import { sep, join } from 'path';
import readChunk from 'read-chunk';
import fileType from 'file-type';

export type FileAtributes = FileStats & {
  hash: string,
  name: string,
  path: string,
  // from fileType
  mime?: string,
  ext?: string,
};

export type Sys = {
  files: Array<FileAtributes>,
  folders: Array<{ name: string }>,
  path: Array<string>,
};

type UpdateFilesAction = {
  type: 'UPDATE_FILES',
  payload: Sys,
};

export type SysActions = UpdateFilesAction;

export const changeFolder = (
  sysLocation: Array<string> | string,
  showHidden: boolean = false,
) => async (dispatch: Dispatch<UpdateFilesAction>) => {
  const path = isString(sysLocation) ? sysLocation.split(sep) : sysLocation;
  try {
    const folderContent = await readDir(path);
    const [files, folders] = folderContent
      .filter(({ name }) => (showHidden ? true : name[0] !== '.'))
      .reduce(
        ([accFiles, accFolder], curr) =>
          curr.isDirectory()
            ? [accFiles, [...accFolder, { name: curr.name }]]
            : [[...accFiles, curr], accFolder],
        [[], []],
      );
    const pr = await Promise.all(
      files.map(async ({ name }) => {
        return await setFileAtributes(path, name);
      }),
    );
    console.log(folders);
    console.log(pr);
    dispatch({
      type: 'UPDATE_FILES',
      payload: {
        files: pr,
        folders,
        path,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const setFileAtributes = async (
  fileLocation: Array<string>,
  fileName: string,
): Promise<?FileAtributes> => {
  try {
    const path = join(...fileLocation, fileName);
    const fileStats = await getFileStats(path);
    const chunk = await readChunk(path, 0, fileType.minimumBytes);
    return {
      ...fileType(chunk),
      ...fileStats,
      name: fileName,
      path,
    };
  } catch (e) {
    console.log(e);
  }
};
