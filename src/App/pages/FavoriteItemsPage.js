import React from 'react';
import { Header } from '@components/Header/Header';
import './FavoriteItemsPage.scss';
import { FavoriteItems } from '../components/FavoriteItems/FavoriteItems';

export function FavoriteItemsPage() {
  return (
    <div className='favorites'>
      <div className='background'>
        <div className='blur'></div>
      </div>
      <Header />
      <main className='favorites__body'>
        <h1 className='favorites__title'>Favorite Beer</h1>
        <FavoriteItems />
      </main>
    </div>
  );
}
