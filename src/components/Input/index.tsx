import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: string;
  register?: UseFormRegisterReturn;
}

const Input = ({ label, type, children, register, ...props }: InputProps): JSX.Element => {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input className="input" type={type} {...register} {...props} />
      {children}
    </div>
  );
};

export default Input;
