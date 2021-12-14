import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('myAPI', {
  openDialog: async (): Promise<void | string[]> =>
    await ipcRenderer.invoke('open-dialog'),

  test: async () => {
    const result = await ipcRenderer.invoke('test')
    return result;
  },
  connect: async () => {
    const result = await ipcRenderer.invoke('connect')
    return result;
  }

});