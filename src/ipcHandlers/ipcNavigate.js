let mainWindow;

const navigate = (event, page) => {
  if (mainWindow) {
    mainWindow.loadFile(`src/windows/${page}/${page}.html`);
  }
};

const setMainWindow = (win) => {
  mainWindow = win;
};

module.exports = {
  navigate,
  setMainWindow,
};
