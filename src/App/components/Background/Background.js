import React from 'react';
import './Background.scss';

export function Background({ backgroundImageLink }) {
  return (
    <div className='background' style={{ backgroundImage: `url(${backgroundImageLink})` }}>
      <div className='blur'></div>
    </div>
  );
}
