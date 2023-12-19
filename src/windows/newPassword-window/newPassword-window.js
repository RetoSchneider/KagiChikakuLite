document.getElementById("password-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const website = document.getElementById("website").value;
  const description = document.getElementById("description").value;

  const passwordData = {
    username,
    password,
    website,
    description,
  };

  const filePath = localStorage.getItem("selectedFilePath");

  if (filePath) {
    window.electronAPI.send("add-password", { filePath, passwordData });
  } else {
    console.error("File path not found");
  }
});

window.electronAPI.receive("add-password-response", (message) => {
  if (message === "Password added successfully!") {
  } else {
    console.error(message);
  }
});

document.getElementById("return-button").addEventListener("click", () => {
  window.electronAPI.send("navigate", "storage-window");
});
