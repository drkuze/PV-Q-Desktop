const { app, BrowserWindow } = require('electron');
const path = require('path');
const RPC = require('discord-rpc');

let win;
const clientId = '1358386522394591242'; // Deine Discord-App-ID
const rpc = new RPC.Client({ transport: 'ipc' });

// Discord Rich Presence Setup
rpc.on('ready', () => {
  console.log('Discord RPC ist bereit');

  rpc.setActivity({
    details: 'pv-q.de Control Panel',
    state: 'Serververwaltung leicht gemacht',
    startTimestamp: Date.now(),
    largeImageKey: 'logo', // Stelle sicher, dass das Bild in deiner Discord-App existiert
    largeImageText: 'Node-basiertes Hosting',
  });
});

function createWindow() {
  win = new BrowserWindow({
    width: 1580,
    height: 978,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'assets\\icons\\Icon_512x512.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  win.loadURL('https://pv-q.de/');

  win.on('closed', () => {
    win = null;
  });
}

app.whenReady().then(() => {
  createWindow();
  rpc.login({ clientId }).catch(console.error);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
