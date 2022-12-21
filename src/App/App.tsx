import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { EnterPage } from '@pages/EnterPage';
import { MainPage } from '@pages/MainPage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { AllItemsPage } from '@pages/AllItemsPage';
import { FavoriteItemsPage } from '@pages/FavoriteItemsPage';
import { useAuthentication } from '@/App/Redux/hooks/use-auth';

import './App.scss';

export function App() {
  const { isAuthorized } = useAuthentication();

  return (
    <div className='app-body'>
      <React.StrictMode>
        <Routes>
          <Route path='enter' element={<EnterPage />} />
          <Route path='/main' element={isAuthorized ? <MainPage /> : <Navigate to='/enter' />} />
          <Route
            path='all-beer'
            element={isAuthorized ? <AllItemsPage /> : <Navigate to='/enter' />}
          />
          <Route
            path='favorites'
            element={isAuthorized ? <FavoriteItemsPage /> : <Navigate to='/enter' />}
          />
          <Route path='/' element={<Navigate to='/main' />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </React.StrictMode>
    </div>
  );
}
