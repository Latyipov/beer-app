import React from 'react';
import './Background.scss';

export function Background({ backgroundImageLink }) {
  return (
    <div className='background' style={{ backgroundImage: `url(${backgroundImageLink})` }}>
      <div className='background__blur'></div>
    </div>
  );
}
