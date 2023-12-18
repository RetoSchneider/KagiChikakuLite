const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    minWidth: 330,
    maxWidth: 330,
    minHeight: 620,
    maxHeight: 620,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  loadPage("welcome-window");
};

const loadPage = (page) => {
  mainWindow.loadFile(path.join(__dirname, `src/windows/${page}/${page}.html`));
};

app.on("ready", createWindow);

const { ipcMain } = require("electron");

ipcMain.on("navigate", (event, page) => {
  loadPage(page);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});