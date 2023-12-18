const { ipcMain, dialog } = require('electron');

ipcMain.on('open-file-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'CSV Files', extensions: ['csv'] }]
  }).then(result => {
    if (!result.canceled) {
      event.reply('selected-file', result.filePaths[0]);
    }
  }).catch(err => {
    console.error(err);
  });
});
