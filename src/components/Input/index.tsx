import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: string;
}

const Input = ({ label, type, ...props }: InputProps): JSX.Element => {
  return (
    <div className="form-field">
      <label className="form-field__label">{label}</label>
      <input className="form-field__input" type={type} {...props} />
    </div>
  );
};

export default Input;
