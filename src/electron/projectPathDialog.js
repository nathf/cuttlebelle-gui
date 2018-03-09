const { dialog, ipcMain } = require('electron');

ipcMain.on('select-project-path', (event, arg) => {
  const selectedDirectory = dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory']
  });

  if (selectedDirectory) {
    event.sender.send('selected-project-path', {
      projectPath: selectedDirectory[0]
    });
  }
});
