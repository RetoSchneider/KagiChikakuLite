document.getElementById("create-list").addEventListener("click", () => {
  const listName = document.getElementById("list-name").value;
  const listPassword = document.getElementById("list-password").value;
  const backupEmail = document.getElementById("backup-email").value;

  const username = null;
  const website = null;
  const description = null;

  const csvContent = `List Name,Password, Username, Website, Description\n${listName},${listPassword},${backupEmail},${username},${website},${description}`;

  window.electron.send("save-csv", csvContent);
});

window.electron.receive("save-csv-response", (message) => {
  console.log(message);
});

document.getElementById("return-button").addEventListener("click", () => {
  window.electron.send("navigate", "welcome-window");
});
