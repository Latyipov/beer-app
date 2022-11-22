import React, { useState } from 'react';
import { RandomItem } from '@/App/components/RandomItem/RandomItem';
import { FavoriteItems } from '@components/FavoriteItems/FavoriteItems';
import { Header } from '@components/Header/Header';
import { Background } from '../components/Background/Background';
import { UpScrollButton } from '@components/UpScrollButton/UpScrollButton';
import backgroundImageLink from '@/App/images/background-wallpaper.jpg';
import './MainPage.scss';

export function MainPage() {
  const [isRandomButtonOn, setIsRandomButtonOn] = useState(false);
  const [isFavoriteButtonOn, setIsFavoriteButtonOn] = useState(false);

  return (
    <div className='main-page'>
      <Background backgroundImageLink={backgroundImageLink} />
      <Header />
      <main className='main-page__body'>
        <button
          className='main-page__button'
          onClick={() => setIsRandomButtonOn(!isRandomButtonOn)}
        >
          {isRandomButtonOn ? 'Hide random beer' : 'Show random beer'}
        </button>
        {isRandomButtonOn && <RandomItem />}

        <button
          className='main-page__button'
          onClick={() => setIsFavoriteButtonOn(!isFavoriteButtonOn)}
        >
          {isFavoriteButtonOn ? 'Hide favorite beers list' : 'My favorite beers list'}
        </button>
        {isFavoriteButtonOn && <FavoriteItems />}
        <UpScrollButton />
      </main>
    </div>
  );
}
