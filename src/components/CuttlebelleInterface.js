const { ipcRenderer } = window.require('electron');

// ipcRenderer.on('github-oauth-reply', (event, session) => {
//   window.localStorage.setItem(TOKEN_STORAGE_KEY, session.access_token);
// });

// ipcRenderer.send('github-oauth', 'getToken');

export default (cwd) => {
  const cwdR = ipcRenderer.sendSync('cuttlebelle.cwd', cwd);
  console.log({cwdR})
  return {
    SETTINGS: {
      get: () => {
        ipcRenderer.send('cuttlebelle.settings', 'get');
        return new Promise(resolve => {
          ipcRenderer.once('cuttlebelle.settings.get', (event, context) => {
            resolve(context);
          });
        });
      },
      set: values => {
        ipcRenderer.send('cuttlebelle.settings', 'set', values);
        return new Promise(resolve => {
          ipcRenderer.once('cuttlebelle.settings.set', (event, context) => {
            resolve(context);
          });
        });
      }
    }
  };
};
