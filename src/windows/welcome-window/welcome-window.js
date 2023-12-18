document.getElementById("create-new-list").addEventListener("click", () => {
  window.electron.send("navigate", "newList-window");
});

document.getElementById("open-list").addEventListener("click", () => {
  window.electron.send("navigate", "storage-window");
});
