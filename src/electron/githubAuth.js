const { ipcMain } = require('electron');
const electronOauth2 = require('electron-oauth2');

const scopes = [
  'user',
  'public_repo',
  'repo',
  'repo_deployment',
  'repo:status'
];

const oauth = {
  clientId: process.env.GITHUB_CLIENT_ID || 'ac6366959e29de6ae6e8',
  clientSecret:
    process.env.GITHUB_CLIENT_SECRET ||
    '9960786af2f6d444e61b34c62f48c0541df8ee67',
  authorizationUrl: `http://github.com/login/oauth/authorize?scope=${scopes.join(
    '%20'
  )}`,
  tokenUrl: 'https://github.com/login/oauth/access_token',
  useBasicAuthorizationHeader: false,
  // don't touch me
  redirectUri: 'http://localhost'
};
const windowParams = {
  alwaysOnTop: true,
  autoHideMenuBar: true,
  webPreferences: {
    nodeIntegration: false
  }
};

const githubOAuth = electronOauth2(oauth, windowParams);

ipcMain.on('github-oauth', (event, arg) => {
  githubOAuth.getAccessToken({}).then(
    token => {
      event.sender.send('github-oauth-reply', token);
    },
    err => {
      console.log('Error while getting token', err);
    }
  );
});
