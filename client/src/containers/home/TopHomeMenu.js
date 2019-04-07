import './home-menu-top.scss';
import React from 'react';
import Actions from './Actions';

export default function TopHomeMenu() {
  return (
    <div className="top-home-menu-container">
      <Actions horizontal />
    </div>
  );
}
