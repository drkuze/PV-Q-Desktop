const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  startGame: () => ipcRenderer.send('start-game'),
});
