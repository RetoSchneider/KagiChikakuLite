const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const saveCsv = require("./src/ipcHandlers/ipcSaveCsv");
const { navigate, setMainWindow } = require("./src/ipcHandlers/ipcNavigate");

require("./src/ipcHandlers/ipcReadCsv");
require("./src/ipcHandlers/ipcOpenFileDialog");
require("./src/ipcHandlers/ipcAddNewPassword");
require("./src/ipcHandlers/ipcUpdatePasswords");
require("./src/ipcHandlers/ipcFetchCsvData");
require("./src/ipcHandlers/ipcDeletePassword");

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

  setMainWindow(mainWindow);
  navigate(null, "welcome-window");
};

app.on("ready", createWindow);

ipcMain.on("navigate", navigate);
ipcMain.on("save-csv", saveCsv);

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
