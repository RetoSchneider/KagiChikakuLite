const { dialog } = require('electron');
const fs = require('fs');

const saveCsv = (event, csvContent) => {
    dialog.showSaveDialog({
        title: 'Save the list as CSV',
        defaultPath: '~/newList.csv',
        filters: [{ name: 'CSV Files', extensions: ['csv'] }]
    }).then(file => {
        if (!file.canceled && file.filePath) {
            fs.writeFile(file.filePath.toString(), csvContent, 'utf-8', (err) => {
                if (err) {
                    event.reply('save-csv-response', 'Error: ' + err.message);
                } else {
                    event.reply('save-csv-response', 'CSV file saved successfully!');
                }
            });
        }
    }).catch(err => {
        event.reply('save-csv-response', 'Error: ' + err.message);
    });
};

module.exports = saveCsv;
