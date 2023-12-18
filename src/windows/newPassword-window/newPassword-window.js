document.getElementById("return-button").addEventListener("click", () => {
  window.electronAPI.send("navigate", "storage-window");
});
