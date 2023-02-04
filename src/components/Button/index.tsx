import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  dataTestId?: string;
  disabled?: boolean;
  className?: string;
}

const Button = ({ dataTestId, disabled, className, children, ...props }: ButtonProps): JSX.Element => {
  return (
    <button disabled={disabled} className={className} data-test-id={dataTestId} {...props}>
      {children}
    </button>
  );
};

export default Button;
