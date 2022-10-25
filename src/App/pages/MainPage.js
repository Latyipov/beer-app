import React from 'react';
import { RandomApiItem } from '@components/RandomApiItem/RandomApiItem';
import { FavoriteItems } from '@components/FavoriteItems/FavoriteItems';
import { Header } from '@components/Header/Header';

import './MainPage.scss';

export function MainPage() {
  return (
    <div className='main'>
      <Header />
      <main className='main__body'>
        <RandomApiItem />
        <FavoriteItems />
      </main>
    </div>
  );
}
