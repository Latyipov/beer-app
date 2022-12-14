import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { EnterPage } from '@/App/pages/EnterPage';
import { MainPage } from '@/App/pages/MainPage';
import { NotFoundPage } from '@/App/pages/NotFoundPage';
import { AllItemsPage } from '@/App/pages/AllItemsPage';
import { FavoriteItemsPage } from '@/App/pages/FavoriteItemsPage';
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
