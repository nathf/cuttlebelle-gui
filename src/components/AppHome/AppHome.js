//@flow
import React from 'react';
import { query, Connect } from 'urql';

const AppHomeQuery = `
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

type AppHomeState = {|
  repo: ?string  
|};

class AppHome extends React.Component<?{}, AppHomeState> {
  state = {
    repo: undefined
  }

  onRepoSelect = (e: SyntheticEvent<HTMLSelectElement>) => {
    // $FlowFixMe
    const repo = e.target.value;
    this.setState(() => ({ repo }));
  }

  render() {
    return (
      <Connect
        query={query(AppHomeQuery)}
      >
        {({ loaded, fetching, refetch, data, error }) => {
          if (!loaded || fetching) {
            return <h1>Loading...</h1>
          }
          return (
            <section>
              <h1>Welcome {data.viewer.name}</h1>
              <h2>Select a repository</h2>
              <p>Selected: {this.state.repo}</p>
              <select name="repos" onChange={this.onRepoSelect} value={this.state.repo}>
                <option value={false}>-- Select a repo --</option>
                {data.viewer.repositories.nodes.map((node, index) => (
                  <option value={node.name} key={node.name}>{node.name}</option>
                ))}
              </select>
            </section>
          );
        }}
      </Connect>
    )
  }
}

export default AppHome;
