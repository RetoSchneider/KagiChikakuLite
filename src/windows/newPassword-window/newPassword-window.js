document.getElementById("return-button").addEventListener("click", () => {
  window.electron.send("navigate", "storage-window");
});
