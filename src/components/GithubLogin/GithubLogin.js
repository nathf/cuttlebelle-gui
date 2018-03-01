import React from 'react';
import Button from '../Button';
import Header from '../Header';
import { TOKEN_STORAGE_KEY } from '../../githubTokenContext';

const electron = window.require('electron');

class GithubLogin extends React.Component {
  componentDidMount() {
    electron.ipcRenderer.on('github-oauth-reply', (event, session) => {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, session.access_token);
    });
    electron.ipcRenderer.on('selected-local-dir', (event, context) => {
      window.localStorage.setItem('localDir', context[0]);
    });
  }

  render() {
    return (
      <Header>
          <Button
            onClick={() => {
              electron.ipcRenderer.send('github-oauth', 'getToken');
            }}
          >
            Login with Github
          </Button>
          <p>
            <strong>OR</strong>
          </p>
          <Button
            onClick={() => {
              electron.ipcRenderer.send('select-local-dir');
            }}
          >
            Select from local
          </Button>
      </Header>
    );
  }
}

export default GithubLogin;
