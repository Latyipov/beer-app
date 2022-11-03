import React from 'react';
import smallLoader from '../../images/PlainVapidGalah-max-1mb.gif';
import './SmallLoading.scss';

export function SmallLoading() {
  return (
    <div className='small-loading'>
      <img alt='small-loader' src={smallLoader} className='small-loading__image' />
    </div>
  );
}
