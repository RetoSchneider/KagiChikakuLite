const { ipcMain } = require("electron");
const fs = require("fs");
const readline = require("readline");

ipcMain.on("delete-password", (event, { filePath, username, website }) => {
  deletePasswordFromCSV(filePath, username, website, event);
});

function deletePasswordFromCSV(filePath, username, website, event) {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      event.reply("delete-password-response", "CSV file not found.");
      return;
    }

    let fileStream = fs.createReadStream(filePath);
    let rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let newData = [];
    let found = false;

    rl.on("line", (line) => {
      let [, , , ...data] = line.split(",");
      if (data[0] !== username || data[2] !== website) {
        newData.push(line);
      } else {
        found = true;
      }
    });

    rl.on("close", () => {
      if (!found) {
        event.reply("delete-password-response", "Password not found.");
        return;
      }
      fs.writeFile(filePath, newData.join("\n"), (writeErr) => {
        if (writeErr) {
          event.reply("delete-password-response", "Error: " + writeErr.message);
          return;
        }
        event.reply(
          "delete-password-response",
          "Password deleted successfully!",
        );
      });
    });
  });
}
