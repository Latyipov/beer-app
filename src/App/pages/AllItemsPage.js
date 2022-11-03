import React from 'react';
import { Header } from '@components/Header/Header';
import { AllItems } from '@components/AllItems/AllItems';
import { Background } from '@components/Background/Background';

import backgroundImageLink from '@/App/images/cans-wallpaper.jpg';

import './AllItemsPage.scss';

export function AllItemsPage() {
  return (
    <div className='all-item-list'>
      <Background backgroundImageLink={backgroundImageLink} />
      <Header />
      <main className='all-item-list__body'>
        <h1 className='all-item-list__title'>All Beer</h1>
        <AllItems />
      </main>
    </div>
  );
}
