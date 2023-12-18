const { ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");

function readCsv(filePath) {
  return new Promise((resolve, reject) => {
    let results = [];
    fs.createReadStream(path.resolve(filePath))
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

ipcMain.on("read-csv", (event, filePath) => {
  readCsv(filePath)
    .then((data) => {
      event.reply("csv-content", data);
    })
    .catch((err) => {
      console.error(err);
      event.reply("csv-content", []);
    });
});
