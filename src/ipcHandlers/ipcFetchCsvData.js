const { ipcMain } = require("electron");
const { readCsv } = require("./ipcReadCsv");

ipcMain.on("fetch-csv-data", async (event, filePath) => {
  try {
    const csvData = await readCsv(filePath);
    event.reply("updated-csv-data", csvData);
  } catch (err) {
    console.error(err);
    event.reply("updated-csv-data", []);
  }
});
