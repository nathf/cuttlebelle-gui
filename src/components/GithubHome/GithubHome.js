//@flow
import React, { Fragment } from 'react';
import { query, Connect } from 'urql';

import Header from '../Header';

import './GithubHome.css';

const GithubHomeQuery = `
query {
  viewer {
    name
     repositories(last: 10) {
       nodes {
         name
       }
     }
   }
}
`;

type GithubHomeState = {|
  repo: ?string
|};

class GithubHome extends React.Component<?{}, GithubHomeState> {
  state = {
    repo: undefined
  };

  onRepoSelect = (e: SyntheticEvent<HTMLSelectElement>) => {
    // $FlowFixMe
    const repo = e.target.value;
    this.setState(() => ({ repo }));
  };

  render() {
    return (
      <Connect query={query(GithubHomeQuery)}>
        {({ loaded, fetching, refetch, data, error }) => {
          if (!loaded || fetching) {
            return (
              <Fragment>
                <Header>
                  <h1>GitHub</h1>
                </Header>
                <section className="githubhome__container">
                  <h2>Loading...</h2>
                </section>
              </Fragment>
            );
          }
          return (
            <Fragment>
              <Header>
                <h1>GitHub</h1>
              </Header>
              <section className="githubhome__container">
                <h2>{data.viewer.name}</h2>
                <h3>Select a repository</h3>
                <p>Selected: {this.state.repo}</p>
                <select
                  name="repos"
                  onChange={this.onRepoSelect}
                  value={this.state.repo}
                >
                  <option value={false}>-- Select a repo --</option>
                  {data.viewer.repositories.nodes.map((node, index) => (
                    <option value={node.name} key={node.name}>
                      {node.name}
                    </option>
                  ))}
                </select>
              </section>
            </Fragment>
          );
        }}
      </Connect>
    );
  }
}

export default GithubHome;
