import React from 'react';

interface ButtonProps {
  name: string;
  disabled?: boolean;
  className?: string;
}

const Button = ({ name, disabled, className }: ButtonProps): JSX.Element => {
  return (
    <button disabled={disabled} className={className}>
      {name}
    </button>
  );
};

export default Button;
