const { ipcMain } = require("electron");
const fs = require("fs");
const readline = require("readline");

ipcMain.on("edit-password", (event, { filePath, originalData, newData }) => {
  editPasswordInCSV(filePath, originalData, newData, event);
});

function editPasswordInCSV(filePath, originalData, newData, event) {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      event.reply("edit-password-response", "CSV file not found.");
      return;
    }

    let fileStream = fs.createReadStream(filePath);
    let rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let updatedData = [];
    let found = false;

    rl.on("line", (line) => {
      let [, , , username, password, website, description] = line.split(",");

      if (
        username === originalData.username &&
        website === originalData.website
      ) {
        found = true;
        updatedData.push(
          [
            ,
            ,
            ,
            newData.username,
            newData.password,
            newData.website,
            newData.description || "no description",
          ].join(","),
        );
      } else {
        updatedData.push(line);
      }
    });

    rl.on("close", () => {
      if (!found) {
        event.reply(
          "edit-password-response",
          "Original password entry not found.",
        );
        return;
      }

      fs.writeFile(filePath, updatedData.join("\n"), (writeErr) => {
        if (writeErr) {
          event.reply("edit-password-response", "Error: " + writeErr.message);
          return;
        }
        event.reply("edit-password-response", "Password edited successfully!");
      });
    });
  });
}
