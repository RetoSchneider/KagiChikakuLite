document.addEventListener("DOMContentLoaded", () => {
  const entry = JSON.parse(localStorage.getItem("editEntry"));
  if (entry) {
    document.getElementById("edit-username").value = entry.Username;
    document.getElementById("edit-password").value = entry.Password;
    document.getElementById("edit-website").value = entry.Website;
    document.getElementById("edit-description").value = entry.Description;

    document
      .getElementById("edit-username")
      .setAttribute("data-original-username", entry.Username);
    document
      .getElementById("edit-website")
      .setAttribute("data-original-website", entry.Website);
  }
});

document
  .getElementById("edit-password-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const usernameField = document.getElementById("edit-username");
    const websiteField = document.getElementById("edit-website");

    const originalUsername = usernameField.getAttribute(
      "data-original-username",
    );
    const originalWebsite = websiteField.getAttribute("data-original-website");

    const username = usernameField.value;
    const password = document.getElementById("edit-password").value;
    const website = websiteField.value;
    const description = document.getElementById("edit-description").value;

    const filePath = localStorage.getItem("selectedFilePath");

    if (filePath) {
      electronAPI.send("edit-password", {
        filePath,
        originalData: { username: originalUsername, website: originalWebsite },
        newData: { username, password, website, description },
      });
    } else {
      console.error("File path not found");
    }
  });

electronAPI.receive("edit-password-response", (message) => {
  if (message === "Password edited successfully!") {
  } else {
    console.error(message);
  }
});

document.getElementById("show-password").addEventListener("click", () => {
  const passwordField = document.getElementById("edit-password");
  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
});

document
  .getElementById("generate-password")
  .addEventListener("click", () => {});

document.getElementById("return-button").addEventListener("click", () => {
  electronAPI.send("navigate", "storage-window");
});
