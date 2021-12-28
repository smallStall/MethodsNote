import path from 'path';
import { BrowserWindow, app, session, ipcMain } from 'electron';
import { searchDevtools } from 'electron-search-devtools';
import { MikroORM } from '@mikro-orm/core';
import { Project } from './infra/entity/project';
import options from './mikro-orm.config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const Database = require('better-sqlite3-multiple-ciphers');

const isDev = process.env.NODE_ENV === 'development';

/// #if DEBUG
const execPath =
  process.platform === 'win32'
    ? '../node_modules/electron/dist/electron.exe'
    : '../node_modules/.bin/electron';

if (isDev) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('electron-reload')(__dirname, {
    electron: path.resolve(__dirname, execPath),
    forceHardReset: true,
    hardResetMethod: 'exit',
  });
}
/// #endif

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  if (isDev) mainWindow.webContents.openDevTools({ mode: 'detach' });

  mainWindow.loadFile('dist/index.html');


  ipcMain.handle('connect', async () => {

    const orm = await MikroORM.init(options);
    const projectRepository = orm.em.getRepository(Project);
    const newProject = new Project();
    newProject.name = "のっほそ";
    newProject.objective = "おにぎり";
    newProject.background = "はいけい"

    await projectRepository.persistAndFlush(newProject);
    const project = await projectRepository.findAll();
    return project;
  });

};

app.whenReady().then(async () => {
  if (isDev) {
    const devtools = await searchDevtools('REACT');
    if (devtools) {
      await session.defaultSession.loadExtension(devtools, {
        allowFileAccess: true,
      });
    }
  }

  createWindow();
});

app.once('window-all-closed', () => app.quit());
