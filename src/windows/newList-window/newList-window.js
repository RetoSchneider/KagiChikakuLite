const listNameInput = document.getElementById("list-name");
const listPasswordInput = document.getElementById("list-password");
const repeatPasswordInput = document.getElementById("repeat-password");
const backupEmailInput = document.getElementById("backup-email");
const createListButton = document.getElementById("create-list");

function checkFormValidity() {
  const listName = listNameInput.value.trim();
  const listPassword = listPasswordInput.value.trim();
  const repeatPassword = repeatPasswordInput.value.trim();
  const backupEmail = backupEmailInput.value.trim();

  const isFormValid =
    listName && listPassword && repeatPassword && backupEmail && listPassword === repeatPassword;

  if (isFormValid) {
    createListButton.disabled = false;
    createListButton.classList.remove("disabled-btn");
  } else {
    createListButton.disabled = true;
    createListButton.classList.add("disabled-btn");
  }
}

listNameInput.addEventListener("input", checkFormValidity);
listPasswordInput.addEventListener("input", checkFormValidity);
repeatPasswordInput.addEventListener("input", checkFormValidity);
backupEmailInput.addEventListener("input", checkFormValidity);

createListButton.addEventListener("click", () => {
  const listName = listNameInput.value;
  const listPassword = listPasswordInput.value;
  const backupEmail = backupEmailInput.value;

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

checkFormValidity();