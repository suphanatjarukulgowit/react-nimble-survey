import React from 'react';

interface ButtonProps {
  name: string;
  disabled?: boolean;
  className?: string;
}

const Button = ({ name, disabled, className, ...props }: ButtonProps): JSX.Element => {
  return (
    <button disabled={disabled} className={className} {...props}>
      {name}
    </button>
  );
};

export default Button;
