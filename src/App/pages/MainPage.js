import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/use-auth'
import { FactsComponentAdder } from '../components/FactsComponentAdder/FactsComponentAdder'
import { FavoriteFactsComponentAdder } from '../components/FavoriteFactsComponentAdder/FavoriteFactsComponentAdder'
import { useDispatch } from 'react-redux'
import { removeUser } from '../store/slices/userSlice'

import './MainPage.css'

export function MainPage () {
  const dispatch = useDispatch()
  const { isAuth, userEmail, userId } = useAuth()
  return isAuth
    ? (
    <div className='bodyApp'>
      <button
        className='btn outButton'
        onClick={() => dispatch(removeUser())}
      >
        Sign out
      </button>
      <h1>Hello {userEmail} </h1>
      <FactsComponentAdder userId={userId} />
      <FavoriteFactsComponentAdder userId={userId} />
    </div>)
    : (<Navigate to='/signin' />)
}
