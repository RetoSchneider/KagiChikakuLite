const { ipcMain } = require("electron");
const { readCsv } = require("./ipcReadCsv");

ipcMain.on("request-password-list-update", (event, filePath) => {
  readCsv(filePath)
    .then((data) => {
      event.reply("send-updated-password-list", data);
    })
    .catch((err) => {
      console.error(err);
      event.reply("send-updated-password-list", []);
    });
});
