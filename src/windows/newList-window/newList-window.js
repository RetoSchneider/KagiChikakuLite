document.getElementById("create-list").addEventListener("click", () => {
  const listName = document.getElementById("list-name").value;
  const listPassword = document.getElementById("list-password").value;
  const backupEmail = document.getElementById("backup-email").value;

  const csvContent = `List Name,List Password,Backup Email,Username,Password,Website,Description\n${listName},${listPassword},${backupEmail},,,,,`;

  window.electronAPI.send("save-csv", csvContent);
});

window.electronAPI.receive("save-csv-response", (message) => {
  console.log(message);
});

document.getElementById("return-button").addEventListener("click", () => {
  window.electronAPI.send("navigate", "welcome-window");
});

document
  .getElementById("show-list-password")
  .addEventListener("click", function () {
    const passwordInput = document.getElementById("list-password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      this.textContent = "Hide";
    } else {
      passwordInput.type = "password";
      this.textContent = "Show";
    }
  });

document
  .getElementById("show-repeat-password")
  .addEventListener("click", function () {
    const repeatPasswordInput = document.getElementById("repeat-password");
    if (repeatPasswordInput.type === "password") {
      repeatPasswordInput.type = "text";
      this.textContent = "Hide";
    } else {
      repeatPasswordInput.type = "password";
      this.textContent = "Show";
    }
  });
