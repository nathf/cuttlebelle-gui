//@flow
import React from 'react';
import ansi from 'ansi_up';
import Button from '../Button';
import { ChildProcess } from 'child_process';

// Node / Electron requires
const fs = window.require('fs');
const path = window.require('path');
const spawn = window.require('child_process').spawn;
const appRootDir = window.require('app-root-dir').get();

// Well this is a bit hacky isnt it?
// TODO find out if we even need this. Need to test it on a system with no node installed.
const nodeBinaryPath = path.resolve(appRootDir, 'node_modules/node/bin/node');

type Command = 'watch' | ?'';

type ProjectViewerProps = {
  projectPath: string
};

type ProjectViewerState = {
  processType: Command,
  currentProcess: ?ChildProcess,
  log: string,
  projectPkg: Object
};

class ProjectViewer extends React.Component<
  ProjectViewerProps,
  ProjectViewerState
> {
  constructor(props: ProjectViewerProps) {
    super(props);

    const projectPkgContents = fs.readFileSync(
      `${props.projectPath}/package.json`,
      {
        encoding: 'utf8'
      }
    );

    this.state = {
      currentProcess: null,
      processType: null,
      log: '',
      projectPkg: JSON.parse(projectPkgContents)
    };
  }

  command = (
    cmd: Command,
    processCb: (process: ChildProcess) => void
  ): Promise<?number> => {
    const { projectPath } = this.props;
    const newProcess = spawn(
      nodeBinaryPath,
      [window.require.resolve('cuttlebelle'), cmd],
      {
        cwd: projectPath
      }
    );

    processCb(newProcess);
    this.setState(() => ({ log: '' }));

    newProcess.stdout.on('data', data => {
      this.setState(prevState => ({ log: (prevState.log += data.toString()) }));
    });

    newProcess.stderr.on('data', data => {
      this.setState(prevState => ({ log: (prevState.log += data.toString()) }));
    });

    return new Promise((resolve, reject) => {
      newProcess.on('close', code => {
        if (code !== 0) {
          return reject(code);
        }

        resolve();
      });
    });
  };

  cancelCurrentCommand = () => {
    const { currentProcess } = this.state;
    if (currentProcess) {
      currentProcess.kill();
      this.setState(() => ({ currentProcess: null, processType: null }));
    }
  };

  cuttlebelleCommand = async (command: ?Command) => {
    const { currentProcess } = this.state;
    if (currentProcess) {
      currentProcess.kill();
    }

    try {
      // Wait for command to finishing doing its thing before proceeding.
      await this.command(command, p =>
        this.setState(() => ({ processType: command, currentProcess: p }))
      );

      // When the command is finished, remove frmo state;
      this.setState(() => ({ currentProcess: null }));
    } catch (error) {
      // If no error is returned we assume the task was cancelled via other means.
      if (!error) {
        console.warn('Current command cancelled');
        return;
      }
      console.error(error);
    }
  };

  render() {
    const { projectPath } = this.props;
    const { projectPkg, log, processType } = this.state;

    // TODO Maybe we should have each command as its own component
    // Their actions are different depending on their state.
    return (
      <div style={{ marginTop: 50 }}>
        <h1>Project: {projectPkg.name}</h1>
        <p>
          <small>Building from: {projectPath}</small>
        </p>
        {processType === 'watch' ? (
          <Button onClick={this.cancelCurrentCommand}>Stop watching</Button>
        ) : (
          <Button onClick={() => this.cuttlebelleCommand('watch')}>
            Watch this project
          </Button>
        )}

        {processType === '' ? (
          <Button disabled={true}>Building...</Button>
        ) : (
          <Button onClick={() => this.cuttlebelleCommand('')}>
            Build Project
          </Button>
        )}

        {log && (
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
        )}
      </div>
    );
  }
}

export default ProjectViewer;
