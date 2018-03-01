//@flow
import React, { type Node } from 'react';
import classnames from 'classnames';

import './Button.css';

type ButtonProps = {|
  as?: string,
  disabled?: boolean,
  children: Node,
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => any  
|}

const Button = ({ as, children, disabled, onClick = () => {} }: ButtonProps) => {
  const className = classnames('btn', {
    'btn--block': as === 'block',
    'btn--is-hidden': as === 'hidden'
  });
  return (
    <button className={className} disabled={disabled} onClick={onClick}>{children}</button>
  )
}

export default Button;