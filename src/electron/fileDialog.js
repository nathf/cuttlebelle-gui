const { dialog, ipcMain } = require('electron');



ipcMain.on('select-local-dir', (event, arg) => {
  const dir = dialog.showOpenDialog({ properties: ['openDirectory'] });
  event.sender.send('selected-local-dir', dir);
});
