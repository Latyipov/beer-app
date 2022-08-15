import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthorization } from '@/App/Redux/hooks/use-auth';
import { RandomApiItem } from '@components/RandomApiItem/RandomApiItem';
import { FavoriteItems } from '@components/FavoriteItems/FavoriteItems';
import { useDispatch } from 'react-redux';
import { removeUser } from '@/App/Redux/store/slices/userSlice';

import './MainPage.css';

export function MainPage() {
  const dispatch = useDispatch();
  const { isAuthorized, userName } = useAuthorization();
  return isAuthorized ? (
    <div className='bodyApp'>
      <button className='btn outButton' onClick={() => dispatch(removeUser())}>
        Sign out
      </button>{' '}
      <h1>Hello {userName}!</h1>
      <RandomApiItem />
      <FavoriteItems />
    </div>
  ) : (
    <Navigate to='/signin' />
  );
}
