import path from 'path';
import fs from 'fs';
import { BrowserWindow, app, session, ipcMain, dialog } from 'electron';
import { searchDevtools } from 'electron-search-devtools';
import Database from 'better-sqlite3';

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

  // 'open-dialog' チャネルに受信
  ipcMain.handle('open-dialog', async () => {
    // フォルダ選択ダイアログを開いてディレクトリパスを取得する
    const dirpath = await dialog
      .showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
      })
      .then((result) => {
        // キャンセルされたとき
        if (result.canceled) return;

        // 選択されたディレクトリのパスを返す
        return result.filePaths[0];
      })
      .catch((err) => console.log(err));

    // なにも選択されなかったときやエラーが生じたときは
    // void | undefined となる
    if (!dirpath) return;

    /**
     * Node.fs を使って上で得られたディレクトリパスの
     * ファイル一覧を作成し、返信としてレンダラープロセス
     * へ送る
     */
    const filelist = await fs.promises
      .readdir(dirpath, { withFileTypes: true })
      .then((dirents) =>
        dirents
          .filter((dirent) => dirent.isFile())
          .map(({ name }) => path.join(dirpath, name))
      )
      .catch((err) => console.log(err));

    return filelist;
  });
  ipcMain.handle('connect', () => {
    const db = new Database('assets/lkh.db', { fileMustExist: true, verbose: console.log })
    const row = db.prepare('SELECT * FROM project WHERE id = ?').get(1);
    console.log(row.name);
    return;
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
