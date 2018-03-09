import React from 'react';
import Button from '../Button';
import Splash from '../Splash';

const electron = window.require('electron');

const emitEvent = name => electron.ipcRenderer.send(name);

const BeginOptions = () => (
  <Splash>
    <Button onClick={() => emitEvent('github-oauth')}>Login with Github</Button>
    <p>
      <strong>OR</strong>
    </p>
    <Button onClick={() => emitEvent('select-project-path')}>
      Select from local
    </Button>
  </Splash>
);

export default BeginOptions;
