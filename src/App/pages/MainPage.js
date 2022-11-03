import React, { useState } from 'react';
import { RandomItem } from '@/App/components/RandomItem/RandomItem';
import { FavoriteItems } from '@components/FavoriteItems/FavoriteItems';
import { Header } from '@components/Header/Header';
import { Background } from '../components/Background/Background';

import backgroundImageLink from '@/App/images/background_wallpaper.jpg';
import './MainPage.scss';

export function MainPage() {
  const [isRandomButtonOn, setIsRandomButtonOn] = useState(false);
  const [isFavoriteButtonOn, setIsFavoriteButtonOn] = useState(false);

  return (
    <div className='main'>
      <Background backgroundImageLink={backgroundImageLink} />
      <Header />
      <main className='main__body'>
        <button className='main__button' onClick={() => setIsRandomButtonOn(!isRandomButtonOn)}>
          {isRandomButtonOn ? 'Hide random beer' : 'Show random beer'}
        </button>
        {isRandomButtonOn && <RandomItem />}

        <button className='main__button' onClick={() => setIsFavoriteButtonOn(!isFavoriteButtonOn)}>
          {isFavoriteButtonOn ? 'Hide favorite beer list' : 'My favorite beer list'}
        </button>
        {isFavoriteButtonOn && <FavoriteItems />}
      </main>
    </div>
  );
}
