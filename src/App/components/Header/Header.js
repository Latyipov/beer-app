import React from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuthentication } from '@/App/Redux/hooks/use-auth';
import { removeUser } from '@/App/Redux/store/slices/userSlice';

import './Header.scss';

export function Header() {
  const dispatch = useDispatch();
  const { userName } = useAuthentication();
  const { pathname } = useLocation();

  const checkActiveLocation = (location) => {
    if (matchPath({ path: location, exact: true, strict: false }, pathname)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <header className='header'>
      <div className='header__greet-background'></div>
      <nav className='header__navigation-list'>
        <Link
          className={`header__nav-button ${
            checkActiveLocation('/main') && 'header__nav-button--active'
          }`}
          to='/main'
        >
          Home
        </Link>
        <Link
          className={`header__nav-button ${
            checkActiveLocation('/all-beer') && 'header__nav-button--active'
          }`}
          to='/all-beer'
        >
          All beer
        </Link>
        <Link
          className={`header__nav-button ${
            checkActiveLocation('/favorites') && 'header__nav-button--active'
          }`}
          to='/favorites'
        >
          Favorite beer
        </Link>
      </nav>
      <div className='header__greet'> Hello {userName}!</div>
      <button className='header__out-button' onClick={() => dispatch(removeUser())}>
        Sign out
      </button>
    </header>
  );
}
