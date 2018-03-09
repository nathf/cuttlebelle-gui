//@flow
import React from 'react';
import './Cuttlebelle.css';

import CuttlebelleContext from '../../CuttlebelleContext';
import BeginOptions from '../BeginOptions';
import GithubHome from '../GithubHome';
import ProjectViewer from '../ProjectViewer';

const Cuttlebelle = () => (
  <CuttlebelleContext.Consumer>
    {({ githubAccessToken, projectPath }) => {
      if (projectPath) {
        return <ProjectViewer projectPath={projectPath} />;
      }

      if (githubAccessToken) {
        return <GithubHome />;
      }

      return <BeginOptions />;
    }}
  </CuttlebelleContext.Consumer>
);

export default Cuttlebelle;
