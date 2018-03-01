//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, Client } from 'urql';

import './index.css';
import Cuttlebelle from './components/Cuttlebelle';
import registerServiceWorker from './registerServiceWorker';
import GithubTokenContext, { TOKEN_STORAGE_KEY } from './githubTokenContext';

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
      githubAccessToken: window.localStorage.getItem(TOKEN_STORAGE_KEY),
      projectPath: window.localStorage.getItem('localDir'),
    };
  }

  componentDidMount() {
    electron.ipcRenderer.on('github-oauth-reply', (event, session) => {
      this.setState(() => ({ githubAccessToken: session.access_token }));
    });
    electron.ipcRenderer.on('selected-local-dir', (event, context) => {
      this.setState(() => ({ projectPath: context[0] }));
    });
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
    const githubToken = this.state.githubAccessToken;
    return (
      <GithubTokenContext.Provider value={githubToken}>
        <Provider client={this.urqlClient()}>
          <Cuttlebelle {...this.state} />
        </Provider>
      </GithubTokenContext.Provider>
    );
  }
}

// $FlowFixMe
ReactDOM.render(<CuttlebelleApp />, document.getElementById('root'));
registerServiceWorker();
