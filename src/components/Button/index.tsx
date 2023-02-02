import React from 'react';

interface ButtonProps {
  name: string;
  dataTestId?: string;
  disabled?: boolean;
  className?: string;
}

const Button = ({ name, dataTestId, disabled, className }: ButtonProps): JSX.Element => {
  return (
    <button disabled={disabled} className={className} data-test-id={dataTestId}>
      {name}
    </button>
  );
};

export default Button;
