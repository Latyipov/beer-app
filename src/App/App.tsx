import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { EnterPage } from '@pages/EnterPage';
import { MainPage } from '@pages/MainPage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { AllItemsPage } from '@pages/AllItemsPage';
import { FavoriteItemsPage } from '@pages/FavoriteItemsPage';
import { observer } from 'mobx-react-lite';
import UserState from '@/App/services/MobX/store/UserState';

import './App.scss';

export const App: FC = observer(() => {
  const isSignIn = UserState.userStateData.isSignIn;
  return (
    <div className='app-body'>
      <React.StrictMode>
        <Routes>
          <Route path='enter' element={isSignIn ? <Navigate to='/main' /> : <EnterPage />} />
          <Route path='/main' element={isSignIn ? <MainPage /> : <Navigate to='/enter' />} />
          <Route path='all-beer' element={isSignIn ? <AllItemsPage /> : <Navigate to='/enter' />} />
          <Route
            path='favorites'
            element={isSignIn ? <FavoriteItemsPage /> : <Navigate to='/enter' />}
          />
          <Route path='/' element={<Navigate to='/main' />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </React.StrictMode>
    </div>
  );
});
