//@flow
import React from 'react';
import './Cuttlebelle.css';

import GithubTokenContext from '../../githubTokenContext';
import GithubLogin from '../GithubLogin';
import AppHome from '../AppHome';
import ProjectViewer from '../ProjectViewer';

type CuttlebelleProps = {
  projectPath: ?string
}

const Cuttlebelle = ({ projectPath }: CuttlebelleProps) => {
  if (projectPath) {
    return <ProjectViewer projectPath={projectPath} />;
  }

  return (
    <GithubTokenContext.Consumer>
      {value => (value ? <AppHome /> : <GithubLogin />)}
    </GithubTokenContext.Consumer>
  )
};

export default Cuttlebelle;
