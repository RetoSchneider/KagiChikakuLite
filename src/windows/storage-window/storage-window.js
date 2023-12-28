document.addEventListener("DOMContentLoaded", () => {
  const csvData = JSON.parse(localStorage.getItem("csvData"));
  if (csvData) {
    displayPasswords(csvData);
  }

  fetchDataAndDisplay();

  document
    .getElementById("add-password-button")
    .addEventListener("click", () => {
      window.electronAPI.send("navigate", "newPassword-window");
    });

  document
    .getElementById("exit-storage-button")
    .addEventListener("click", () => {
      window.electronAPI.send("navigate", "welcome-window");
    });
});

window.electronAPI.receive("updated-csv-data", (csvData) => {
  displayPasswords(csvData);
});

window.electronAPI.receive("add-password-response", (message) => {
  if (message === "Password added successfully!") {
    window.electronAPI.send("navigate", "storage-window");
  }
});

window.electronAPI.receive("delete-password-response", (message) => {
  if (message === "Password deleted successfully!") {
    fetchDataAndDisplay();
  } else {
    console.error(message);
  }
});

function displayPasswords(csvData) {
  const listElement = document.getElementById("list");
  listElement.innerHTML = "";

  csvData.slice(1).forEach((entry, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("flex", "justify-between", "mb-2", "items-center");

    const description = entry.Description || "No description";

    listItem.innerHTML = `
      <span>${description}</span>
      <div>
        <button class="edit-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
        <button class="delete-button bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
      </div>
    `;

    listElement.appendChild(listItem);

    const deleteButton = listItem.querySelector(".delete-button");
    deleteButton.setAttribute("data-username", entry.Username);
    deleteButton.setAttribute("data-website", entry.Website);
    deleteButton.addEventListener("click", handleDeletePassword);
  });
}

function handleDeletePassword(event) {
  const button = event.target;
  const filePath = localStorage.getItem("selectedFilePath");
  const username = button.getAttribute("data-username");
  const website = button.getAttribute("data-website");
  window.electronAPI.send("delete-password", { filePath, username, website });
}

function fetchDataAndDisplay() {
  const filePath = localStorage.getItem("selectedFilePath");
  if (filePath) {
    window.electronAPI.send("fetch-csv-data", filePath);
  } else {
    console.error("File path not found");
  }
}

document.addEventListener("DOMContentLoaded", fetchDataAndDisplay);
