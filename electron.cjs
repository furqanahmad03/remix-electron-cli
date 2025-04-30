const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const http = require('http');

let mainWindow;
let frontendDevServer;
let backendDevServer;

function waitForServer(url, callback) {
  const interval = setInterval(() => {
    http.get(url, () => {
      clearInterval(interval);
      callback();
    }).on('error', () => {});
  }, 500);
}

function killProcess(proc) {
  if (proc) {
    try {
      proc.kill('SIGTERM');
    } catch (e) {
      console.error(`Failed to kill process ${proc.pid}:`, e);
    }
  }
}

function createWindow() {
  if (mainWindow) return;

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      contextIsolation: true,
    },
  });

  mainWindow.loadURL('http://localhost:5173');

  mainWindow.on('closed', () => {
    mainWindow = null;

    killProcess(frontendDevServer);
    killProcess(backendDevServer);

    setTimeout(() => {
      app.quit();
      process.exit(0);
    }, 500);
  });
}

app.whenReady().then(() => {
  frontendDevServer = spawn('npm', ['run', 'dev:frontend'], {
    stdio: 'inherit',
    shell: true,
  });

  backendDevServer = spawn('npm', ['run', 'dev:backend'], {
    stdio: 'inherit',
    shell: true,
  });

  waitForServer('http://localhost:5173', () => {
    waitForServer('http://localhost:3030', createWindow);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    killProcess(frontendDevServer);
    killProcess(backendDevServer);
    app.quit();
    process.exit(0);
  }
});

process.on('SIGINT', () => {
  killProcess(frontendDevServer);
  killProcess(backendDevServer);
  process.exit(0);
});
