import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: string;
}

const Input = ({ label, type, ...props }: InputProps): JSX.Element => {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input className="input" type={type} {...props} />
    </div>
  );
};

export default Input;
