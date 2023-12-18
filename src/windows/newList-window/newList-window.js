document.getElementById('create-list').addEventListener('click', () => {
  const listName = document.getElementById('list-name').value;
  const listPassword = document.getElementById('list-password').value;
  const repeatPassword = document.getElementById('repeat-password').value;
  const backupEmail = document.getElementById('backup-email').value;

  const csvContent = `List Name,Password,Repeat Password,Backup Email\n${listName},${listPassword},${repeatPassword},${backupEmail}`;

  window.electron.send('save-csv', csvContent);
});

window.electron.receive('save-csv-response', (message) => {
  console.log(message);
});

document.getElementById("return-button").addEventListener("click", () => {
window.electron.send("navigate", "welcome-window");
});
