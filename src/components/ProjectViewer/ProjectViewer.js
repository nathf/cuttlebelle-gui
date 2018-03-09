//@flow
import React from 'react';
import ansi from 'ansi_up';

import Header from '../Header';
import { Build, Watch, Init } from '../Command';

import './ProjectViewer.css';

// Node / Electron requires
const fs = window.require('fs');

const LogOuput = ({ log }: { log: string }) => {
  if (!log) {
    return null;
  }

  return (
    <section>
      <h3>Log:</h3>
      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: new ansi().ansi_to_html(log)
          }}
        />
      </pre>
    </section>
  );
};



type ProjectViewerProps = {
  projectPath: string
};

type ProjectViewerState = {
  log: string,
  projectPkg: ?Object
};

class ProjectViewer extends React.Component<
  ProjectViewerProps,
  ProjectViewerState
> {
  state = {
    projectPkg: undefined,
    log: ''
  };

  componentDidMount() {
    this.readPackageJson();
  }

  readPackageJson = () => {
    try {
      const { projectPath } = this.props;
      const projectPkgContents = JSON.parse(
        fs.readFileSync(`${projectPath}/package.json`, {
          encoding: 'utf8'
        })
      );

      this.setState(() => ({ projectPkg: projectPkgContents }));
    } catch (e) {}
  };

  captureLog = (log: string) => {
    this.setState(prevState => ({
      log: (prevState.log += log)
    }));
  };

  clearLog = () => {
    this.setState(_ => ({ log: '' }));
  };

  render() {
    const { projectPath } = this.props;
    const { projectPkg, log } = this.state;

    const commandProps = {
      projectPath,
      onLog: this.captureLog,
      logClear: this.clearLog
    };

    if (!projectPkg) {
      return (
        <section className="projectviewer">
          <Header>
            <h1>New project</h1>
          </Header>

          <div className="projectviewer__container">
            <div className="projectviewer__actions">
              <Init {...commandProps} onTaskComplete={this.readPackageJson} />
            </div>

            <LogOuput log={log} />
          </div>
        </section>
      );
    }

    return (
      <section className="projectviewer">
        <Header>
          <h1>
            {projectPkg.name} <small>@ {projectPath}</small>
          </h1>
        </Header>

        <div className="projectviewer__container">
          <div className="projectviewer__actions">
            <Watch {...commandProps} />
            <Build {...commandProps} />
          </div>

          <LogOuput log={log} />
        </div>
      </section>
    );
  }
}

export default ProjectViewer;
