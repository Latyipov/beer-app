import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { EnterPage } from '@/App/pages/EnterPage';
import { MainPage } from '@/App/pages/MainPage';
import { NotFoundPage } from '@/App/pages/NotFoundPage';
import { AllItemList } from '@/App/pages/AllItemList';

import './App.css';

export function App() {
  return (
    <div>
      <Routes>
        <Route path='signin' element={<EnterPage />} />
        <Route path='all-bear' element={<AllItemList />} />
        <Route path='/' element={<Navigate to='/main' />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
