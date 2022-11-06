import React from 'react';
import { Header } from '@components/Header/Header';
import { AllItems } from '@components/AllItems/AllItems';
import { Background } from '@components/Background/Background';
import { UpScrollButton } from '@components/UpScrollButton/UpScrollButton';
import backgroundImageLink from '@/App/images/cans-wallpaper.jpg';

import './AllItemsPage.scss';

export function AllItemsPage() {
  return (
    <div className='all-items-page'>
      <Background backgroundImageLink={backgroundImageLink} />
      <Header />
      <main className='all-items-page__body'>
        <h1 className='all-items-page__title'>All Beer</h1>
        <AllItems />
        <UpScrollButton />
      </main>
    </div>
  );
}
