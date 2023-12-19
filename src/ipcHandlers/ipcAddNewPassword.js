const { ipcMain } = require("electron");
const fs = require("fs");

ipcMain.on("add-password", (event, { filePath, passwordData }) => {
  appendPasswordToCSV(filePath, passwordData, event);
});

function appendPasswordToCSV(filePath, passwordData, event) {
  const { username, password, website, description } = passwordData;

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      event.reply("add-password-response", "CSV file not found.");
      return;
    }
    const newLine = `\n,,,${username || ""},${password || ""},${website || ""},${
      description || "no description"
    }`;

    fs.appendFile(filePath, newLine, "utf8", (appendErr) => {
      if (appendErr) {
        event.reply("add-password-response", "Error: " + appendErr.message);
        return;
      }
      event.reply("add-password-response", "Password added successfully!");
    });
  });
}
