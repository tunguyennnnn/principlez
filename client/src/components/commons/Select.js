import './select.scss';
import React from 'react';

export default function Select({ name, onChange, firstOption, options }) {
  return (
    <select className="select-css" name={name} onChange={onChange}>
      <option value="">{firstOption}</option>
      {options()}
    </select>
  );
}
