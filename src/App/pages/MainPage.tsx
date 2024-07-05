import React, { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { RandomItem } from '@/App/components/RandomItem/RandomItem';
import { FavoriteItems } from '@components/FavoriteItems/FavoriteItems';
import { Header } from '@components/Header/Header';
import { Background } from '../components/Background/Background';
import { UpScrollButton } from '@components/UpScrollButton/UpScrollButton';
import backgroundImageLink from '@/App/images/background-wallpaper.jpg';
import UserState from '@/App/services/MobX/store/UserState';
import './MainPage.scss';

const MainPage: FC = () => {
  const userId = UserState.userStateData.id;
  const [isRandomButtonOn, setIsRandomButtonOn] = useState<boolean>(false);
  const [isFavoriteButtonOn, setIsFavoriteButtonOn] = useState<boolean>(false);

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
          disabled={!userId}
          className='main-page__button'
          onClick={() => setIsFavoriteButtonOn(!isFavoriteButtonOn)}
        >
          {isFavoriteButtonOn ? 'Hide favorite beers list' : 'My favorite beers list'}
        </button>
        {isFavoriteButtonOn && <FavoriteItems />}
        {!userId && (
          <div className='main-page__notification'>
            Please,{' '}
            <Link className='main-page__link' to={'/enter'}>
              Sign In or Sign Up
            </Link>
            that to use &quot;Favorite&quot;{' '}
          </div>
        )}
        <UpScrollButton />
      </main>
    </div>
  );
};
export { MainPage };
