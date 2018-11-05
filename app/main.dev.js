/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import storage from 'electron-json-storage';
import { autoUpdater } from 'electron-updater';
import MenuBuilder from './menu';
import { configureStore } from './store/configureStore';

storage.get('content', (error, data) => {
  configureStore(data, 'main');
});

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1440,
    height: 900,
    minWidth: 978,
    minHeight: 900
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

app.on('ready', () => {
  ipcMain.on('openAboutWindow', () => {
    const win = new BrowserWindow({
      width: 480,
      height: 300,
      title: 'About',
      modal: true,
      show: false,
      maximizable: false,
      minimizable: false,
      frame: false,
      resizable: false
    });
    win.setMenu(null);
    win.loadURL(`file://${__dirname}/about.html`);

    win.once('ready-to-show', win.show);
    win.once('blur', win.close);
  });
});

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});

app.on('ready', () => {
  autoUpdater.checkForUpdates();

  ipcMain.on('openExportWindow', () => {
    const win = new BrowserWindow({
      width: 1024,
      height: 640,
      title: 'Export',
      modal: true,
      show: false,
      maximizable: false,
      minimizable: false,
      frame: false,
      resizable: false
    });
    win.setMenu(null);
    win.loadURL(`file://${__dirname}/export.html`);

    win.once('ready-to-show', win.show);
  });
});
