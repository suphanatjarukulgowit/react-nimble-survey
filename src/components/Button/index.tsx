import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  className?: string;
}

const Button = ({ name, className, ...props }: ButtonProps): JSX.Element => {
  return (
    <button className={className} {...props}>
      {name}
    </button>
  );
};

export default Button;
