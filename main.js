'use strict';

// Import parts of electron to use
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const dotenv = require('dotenv');
const ipcgenThumbnail = require('./src/main/genThumbnail');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false;
dotenv.config();

if (
  process.defaultApp ||
  /[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
  /[\\/]electron[\\/]/.test(process.execPath)
) {
  dev = true;
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true');
  app.commandLine.appendSwitch('force-device-scale-factor', '1');
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1150,
    height: 580,
    show: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
  });

  // and load the index.html of the app.
  let indexPath;

  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:9147',
      pathname: 'index.html',
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true,
    });
  }

  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    // Open the DevTools automatically if developing
    if (dev) {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    // mainWindow.webContents.send('close_socket');
    mainWindow = null;
  });
  ipcgenThumbnail();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// const sharp = require('sharp');
// const { join } = require('path');
// const { pipeline: _pipeline } = require('stream');
// const { promisify } = require('util');
// const B64 = require('@hapi/b64');
// const fs = require('fs');
// const os = require('os');

// const temp = os.tmpdir();
// const toB64 = new B64.Encoder();
// const pipeline = promisify(_pipeline);

// ipcMain.handle('thumbnail-req', async (event, path, ext, hash, width, height) => {
//   const result = await pipeline(
//     fs.createReadStream(path),
//     sharp({
//       create: {
//         width,
//         height,
//       },
//     })
//       .webp()
//       .toBuffer(),
//     toB64,
//     fs.createWriteStream(join(temp, hash)),
//   );
//   return result;
//   // const reader = fs.createReadStream(path);
//   // const s = sharp({
//   //   create: {
//   //     width: 48,
//   //     height: 48,
//   //   },
//   // })
//   //   .webp()
//   //   .toBuffer();
//   // const writer = fs.createWriteStream(join(temp, hash));
//   // reader.pipe(s).pipe(writer);
//   // event.reply('thumbnail-done');
// });
