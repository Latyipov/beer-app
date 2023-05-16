import React, { FC } from 'react';
import smallLoader from '../../images/small-loading.gif';
import './SmallLoading.scss';

export const SmallLoading: FC = () => {
  return (
    <div className='small-loading'>
      <img alt='small-loader' src={smallLoader} className='small-loading__image' />
    </div>
  );
};
