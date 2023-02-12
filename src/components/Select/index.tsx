import React from 'react';
import ReactSelect, { Props as ReactSelectProp } from 'react-select';
// import '../assets/stylesheets/components/_select.scss';

export interface SelectOptionType {
  value: string;
  label: string;
}

const Select = (props: ReactSelectProp<SelectOptionType, false>) => {
  return <ReactSelect {...props} className={`select ${props.className}`} classNamePrefix="select" />;
};

export default Select;
