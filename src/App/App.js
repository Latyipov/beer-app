import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { EnterPage } from './pages/EnterPage';
import { MainPage } from './pages/MainPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';


export function App() {
  return (
    <div>
      {/* <Link to='/singin'> enter</Link>
      <Link to='/'> main</Link> */}
        <Routes>
          <Route path='/singin' element={<EnterPage />} />
          <Route path='/' element={<MainPage />} />
          <Route path= '*' element={<NotFoundPage />} />
        </Routes>
    </div>

  )
}