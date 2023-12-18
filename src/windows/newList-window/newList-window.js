document.getElementById("create-list").addEventListener("click", () => {
  const listName = document.getElementById("list-name").value;
  const listPassword = document.getElementById("list-password").value;
  const backupEmail = document.getElementById("backup-email").value;

  const username = null;
  const password = null;
  const website = null;
  const description = null;

  const csvContent = `List Name,List Password, Username, Password, Website, Description\n${listName},${listPassword},${backupEmail},${username},${password},${website},${description}`;

  window.electronAPI.send("save-csv", csvContent);
});

window.electronAPI.receive("save-csv-response", (message) => {
  console.log(message);
});

document.getElementById("return-button").addEventListener("click", () => {
  window.electronAPI.send("navigate", "welcome-window");
});
