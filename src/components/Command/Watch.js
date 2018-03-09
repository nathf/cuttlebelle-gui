import React from 'react';
import Button from '../Button';
import Command from './Command';

class Build extends Command {
  type = 'watch'

  render() {
    if (this.state.proc === this.type) {
      return <Button onClick={this.cancelCurrentCommand}>Stop watching</Button>;
    }

    return (
      <Button onClick={() => this.run(this.type)}>Watch this project</Button>
    );
  }
}

export default Build;
