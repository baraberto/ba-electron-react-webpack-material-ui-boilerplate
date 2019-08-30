// @flow

import { sep, join } from 'path';
import { promises as fsPromises } from 'fs';
import os from 'os';
import crypto from 'crypto';
import { ipcRenderer } from 'electron';

const homedir = os.homedir();

export const genHash = (f: any): string => {
  const hash = crypto
    .createHash('sha256')
    .update(JSON.stringify(f))
    .digest('hex');
  return hash;
};

export const readDir = async (path: Array<string>): Promise<any> =>
  await fsPromises.readdir(join(...path), { withFileTypes: true });

export type FileStats = {
  size: number,
  modified: number,
  createdDate: Date,
  modifiedDate: Date,
};

export const getFileStats = async (p: string): Promise<FileStats> => {
  const { size, mtimeMs, birthtime, mtime } = await fsPromises.stat(p);
  return { size, modified: mtimeMs, createdDate: birthtime, modifiedDate: mtime };
};

export const getHomeDir = (): Array<string> => normalize(homedir.split(sep));

export const normalize = (p: Array<string>) => {
  const pa = join(...p);
  return sep === '/' ? ['/', ...pa.split(sep)] : pa.split(sep);
};

export const getPreview = async (
  path: string,
  ext: string,
  hash: string,
  width: number,
  height: number,
) => {
  try {
    return await await ipcRenderer.invoke('thumbnail-req', path, ext, hash, width, height);
  } catch (e) {
    console.log(e);
  }
};
