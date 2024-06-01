const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const express = require('express');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.on('ready', () => {
  createWindow();
  startServer();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function startServer() {
  const server = express();

  server.get('/open-notepad', (req, res) => {
    exec('notepad.exe', (error) => {
      if (error) {
        console.error(`exec error: ${error}`);
        res.status(500).send({ success: false, error });
      } else {
        res.send({ success: true });
      }
    });
  });

  server.listen(3001, () => {
    console.log('API server listening on http://localhost:3001');
  });
}
