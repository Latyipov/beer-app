import React from 'react';
import { Header } from '@components/Header/Header';
import { FavoriteItems } from '@components/FavoriteItems/FavoriteItems';
import { Background } from '@components/Background/Background';
import { UpScrollButton } from '@components/UpScrollButton/UpScrollButton';

import backgroundImageLink from '@/App/images/cans-wallpaper.jpg';
import './FavoriteItemsPage.scss';

export function FavoriteItemsPage() {
  return (
    <div className='favorites'>
      <Background backgroundImageLink={backgroundImageLink} />
      <Header />
      <main className='favorites__body'>
        <h1 className='favorites__title'>Favorite Beers</h1>
        <FavoriteItems />
        <UpScrollButton />
      </main>
    </div>
  );
}
