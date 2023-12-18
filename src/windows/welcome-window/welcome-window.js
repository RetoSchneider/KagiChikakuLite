document.getElementById("browse-file").addEventListener("click", () => {
  window.electronAPI.send("open-file-dialog");
});

window.electronAPI.receive("selected-file", (filePath) => {
  document.getElementById("file-path").value = filePath;
});

document.getElementById("open-list").addEventListener("click", () => {
  const filePath = document.getElementById("file-path").value;
  const password = document.getElementById("list-password").value;

  if (passwordIsValid(password)) {
    window.electronAPI.send("read-csv", filePath);
  } else {
    alert("Incorrect password");
  }
});

window.electronAPI.receive("csv-content", (csvData) => {
  localStorage.setItem("csvData", JSON.stringify(csvData)); // Storing data in localStorage
  window.electronAPI.send("navigate", "storage-window");
});

document.getElementById("create-new-list").addEventListener("click", () => {
  window.electronAPI.send("navigate", "newList-window");
});

function passwordIsValid(password) {
  return true;
}
