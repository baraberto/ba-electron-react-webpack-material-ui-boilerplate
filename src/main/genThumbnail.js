// @flow
const sharp = require('sharp');
const { ipcMain } = require('electron');
const { join } = require('path');
const { promises: fsPromises } = require('fs');
const os = require('os');

const temp = os.tmpdir();
module.exports = () => {
  ipcMain.handle('thumbnail-req', async (event, path, ext, hash, width, height) => {
    const thumb = join(temp, hash);
    try {
      return await fsPromises.readFile(thumb);
    } catch (e) {
      const { data, info } = await sharp(path)
        .resize({
          width,
          height,
        })
        .webp()
        .toBuffer({ resolveWithObject: true });
      const base64img = `data:image/${info.format};base64,${data.toString('base64')}`;
      await fsPromises.writeFile(thumb, base64img);
      return base64img;
    }
  });
};
