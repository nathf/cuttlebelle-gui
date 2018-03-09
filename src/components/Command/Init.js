import React from 'react';
import Button from '../Button';
import Command from './Command';

class Init extends Command {
  type = 'init'

  render() {  
    if (this.state.proc === this.type) {
      return <Button disabled={true}>Initing...</Button>;
    }

    return <Button onClick={() => this.run(this.type)}>Init Project</Button>;
  }
}

export default Init;