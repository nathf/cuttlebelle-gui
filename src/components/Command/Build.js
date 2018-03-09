import React from 'react';
import Button from '../Button';
import Command from './Command';

class Build extends Command {
  type = 'build'

  render() {  
    if (this.state.proc === this.type) {
      return <Button disabled={true}>Building...</Button>;
    }

    return <Button onClick={() => this.run(this.type)}>Build Project</Button>;
  }
}

export default Build;