import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { EnterPage } from './pages/EnterPage'
import { MainPage } from './pages/MainPage'
import { NotFoundPage } from './pages/NotFoundPage'
import './App.css'

export function App () {
  return (
    <div>
      <Routes>
        <Route path='signin' element={<EnterPage />} />
        <Route path="/" element={<Navigate to='/main' />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}
