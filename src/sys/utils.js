// @flow

import { sep, join } from 'path';
import { promises as fsPromises } from 'fs';
import os from 'os';
import crypto from 'crypto';
import jimp from 'jimp';

const temp = os.tmpdir();
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

const mimeConvert = {
  png: jimp.MIME_PNG,
  jpg: jimp.MIME_JPG,
  bmp: jimp.MIME_BMP,
};

export const getPreview = async (
  path: string,
  ext: string,
  hash: string,
  width: number,
  height: number,
) => {
  const thumb = join(temp, hash);
  try {
    return await fsPromises.readFile(thumb);
  } catch (e) {
    try {
      const image = await jimp.read(path);
      const converted = await image.resize(width, height).getBase64Async(mimeConvert[ext]);
      await fsPromises.writeFile(thumb, converted);
      return converted;
    } catch (e) {
      console.log(e);
    }
  }
};
