import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthorization } from '@/App/Redux/hooks/use-auth';
import { FactsComponent } from '@components/FactsComponent/FactsComponent';
import { FavoriteFactsComponent } from '@components/FavoriteFactsComponent/FavoriteFactsComponent';
import { useDispatch } from 'react-redux';
import { removeUser } from '@/App/Redux/store/slices/userSlice';

import './MainPage.css';

export function MainPage() {
  const dispatch = useDispatch();
  const { isAuthorized, userEmail, userId } = useAuthorization();
  return isAuthorized ? (
    <div className='bodyApp'>
      <button className='btn outButton' onClick={() => dispatch(removeUser())}>
        Sign out
      </button>
      <h1>Hello {userEmail} </h1>
      <FactsComponent userId={userId} />
      <FavoriteFactsComponent userId={userId} />
    </div>
  ) : (
    <Navigate to='/signin' />
  );
}
