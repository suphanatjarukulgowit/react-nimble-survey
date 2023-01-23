import React from 'react';

interface ButtonProps {
  name: string;
  className?: string;
}

const Button = ({ name, className }: ButtonProps): JSX.Element => {
  return <button className={className}>{name}</button>;
};

export default Button;
