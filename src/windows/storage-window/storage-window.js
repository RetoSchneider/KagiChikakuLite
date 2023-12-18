document.getElementById("add-password-button").addEventListener("click", () => {
  window.electron.send("navigate", "newPassword-window");
});

document.getElementById("exit-storage-button").addEventListener("click", () => {
  window.electron.send("navigate", "welcome-window");
});
