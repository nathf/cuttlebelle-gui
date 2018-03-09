//@flow
import React from 'react';
import { ChildProcess } from 'child_process';

const path = window.require('path');
const spawn = window.require('child_process').spawn;
const appRootDir = window.require('app-root-dir').get();

// Well this is a bit hacky isnt it?
// TODO find out if we even need this. Need to test it on a system with no node installed.
const nodeBinaryPath = path.resolve(appRootDir, 'node_modules/node/bin/node');

type Cmd = 'watch' | 'build';
type CommandState = {
  proc: ?Cmd,
  currentProcess: ?ChildProcess,
  log: string
};

type CommandProps = {
  projectPath: string,
  logClear: () => void,
  onLog: (data: string) => void,
  onTaskComplete: (code: number) => void
};

class Command extends React.Component<CommandProps, CommandState> {
  state = {
    currentProcess: null,
    proc: null,
    log: ''
  };

  remapCommand = {
    build: ''
  };

  onLog = (data: string) => {
    this.setState(prevState => ({ log: (prevState.log += data) }));
  };

  logClear = () => {
    this.setState(() => ({ log: '' }));
  };

  command = (
    cmd: Command,
    processCallback: (process: ChildProcess) => void
  ): Promise<?number> => {
    const {
      projectPath,
      logClear = () => {},
      onLog = (log: string) => {},
      onTaskComplete = (code: number) => {}
    } = this.props;

    const newProcess = spawn(
      nodeBinaryPath,
      [window.require.resolve('cuttlebelle'), cmd],
      {
        cwd: projectPath
      }
    );

    processCallback(newProcess);

    logClear();

    newProcess.stdout.on('data', data => {
      onLog(data.toString());
    });

    newProcess.stderr.on('data', data => {
      onLog(data.toString());
    });

    return new Promise((resolve, reject) => {
      newProcess.on('close', code => {
        onTaskComplete(code);

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
      this.setState(() => ({ currentProcess: null, proc: null }));
    }
  };

  run = async (command: ?Cmd) => {
    const { currentProcess } = this.state;
    if (currentProcess) {
      currentProcess.kill();
    }

    // $FlowFixMe
    const cmd: Cmd = this.remapCommand[command] || command;

    try {
      // Wait for command to finishing doing its thing before proceeding.
      await this.command(cmd, p =>
        this.setState(() => ({ proc: command, currentProcess: p }))
      );

      // When the command is finished, remove frmo state;
      this.setState(() => ({ currentProcess: null, proc: null }));
    } catch (error) {
      // If no error is returned we assume the task was cancelled via other means.
      if (!error) {
        console.warn('Current command cancelled');
        return;
      }
      console.error(error);
    }
  };
}

export default Command;
