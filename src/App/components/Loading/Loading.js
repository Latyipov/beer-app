import React from 'react';
import BeerLoader from '../../images/loading.gif';
import './Loading.scss';

export function Loading() {
  return (
    <div className='loading'>
      <p className='loading__text'>
        loading
        <span className='loading__text-dot'>.</span>
        <span className='loading__text-dot'>.</span>
        <span className='loading__text-dot'>.</span>
      </p>

      <img alt='beer-loader' src={BeerLoader} className='loading__image' />
    </div>
  );
}
