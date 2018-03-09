//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, Client } from 'urql';

import './index.css';
import Cuttlebelle from './components/Cuttlebelle';
import registerServiceWorker from './registerServiceWorker';
import CuttlebelleContext from './CuttlebelleContext';

const electron = window.require('electron');

type CuttlebelleAppProps = {}
type CuttlebelleAppState = {
  githubAccessToken: ?string,
  projectPath: ?string
}

class CuttlebelleApp extends React.Component<CuttlebelleAppProps, CuttlebelleAppState> {
  constructor(props: CuttlebelleAppProps) {
    super(props);
    this.state = {
      githubAccessToken: window.localStorage.getItem('githubAccessToken'),
      projectPath: window.localStorage.getItem('projectPath'),
    };
  }

  componentDidMount() {
    electron.ipcRenderer.on('github-oauth-reply', (event, context) => {
      this.setStateAndLocalStorage('githubAccessToken', context.access_token);
    });
    electron.ipcRenderer.on('selected-project-path', (event, context) => {
      this.setStateAndLocalStorage('projectPath', context.projectPath);
    });
  }

  setStateAndLocalStorage = (key, value) => {
    window.localStorage.setItem(key, value);
    this.setState(() => ({ [key]: value }));
  }

  urqlClient() {
    return new Client({
      url: 'https://api.github.com/graphql',
      fetchOptions: {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.state.githubAccessToken || ''}`
        }
      }
    });
  }

  render() {
    return (
      <CuttlebelleContext.Provider value={this.state}>
        <Provider client={this.urqlClient()}>
          <Cuttlebelle />
        </Provider>
      </CuttlebelleContext.Provider>
    );
  }
}

// $FlowFixMe
ReactDOM.render(<CuttlebelleApp />, document.getElementById('root'));
registerServiceWorker();
