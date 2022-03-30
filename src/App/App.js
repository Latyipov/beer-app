import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { EnterPage } from './pages/EnterPage';
import { MainPage } from './pages/MainPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';


export function App() {

  return (
    <div>
      {/* <Link to='signin'> enter</Link>
      <Link to='main'> main</Link> */}
      <Routes>
        <Route path='signin' element={<EnterPage />} />
        <Route path="/" element={<Navigate to='/main' />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>

  )
}