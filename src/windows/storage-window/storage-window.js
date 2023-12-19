function displayPasswords(csvData) {
  const listElement = document.getElementById("list");
  listElement.innerHTML = "";

  csvData.slice(1).forEach((entry) => {
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
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const csvData = JSON.parse(localStorage.getItem("csvData"));
  if (csvData) {
    displayPasswords(csvData);
  }
});

window.electronAPI.receive("add-password-response", (message) => {
  if (message === "Password added successfully!") {
    window.electronAPI.send("navigate", "storage-window");
  }
});

document.getElementById("add-password-button").addEventListener("click", () => {
  window.electronAPI.send("navigate", "newPassword-window");
});

document.getElementById("exit-storage-button").addEventListener("click", () => {
  window.electronAPI.send("navigate", "welcome-window");
});
