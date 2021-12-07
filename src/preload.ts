import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('myAPI', {
  openDialog: async (): Promise<void | string[]> =>
    await ipcRenderer.invoke('open-dialog'),

  connectDB: () => {
    ipcRenderer.invoke('connect')
  }
});

contextBridge.exposeInMainWorld('connectDB', {
  openDialog: async (): Promise<void | string[]> =>
    await ipcRenderer.invoke('open-dialog'),
});