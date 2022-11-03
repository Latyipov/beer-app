import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuthentication } from '@/App/Redux/hooks/use-auth';
import { removeUser } from '@/App/Redux/store/slices/userSlice';
import { BurgerButton } from '../BurgerButton/BurgerButton';
import { Navigation } from '../Navigation/Navigation';

import './Header.scss';

export function Header() {
  const dispatch = useDispatch();
  const { userName } = useAuthentication();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  return (
    <header className='header'>
      <div className='header__menu'>
        <BurgerButton isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
        <Navigation isBurgerOpen={isBurgerOpen} />
        {isBurgerOpen && (
          <div className='header__menu-liner' onClick={() => setIsBurgerOpen(false)}></div>
        )}
      </div>
      <div className='header__greet'> Hello {userName}!</div>
      <button className='header__out-button' onClick={() => dispatch(removeUser())}>
        Sign out
      </button>
    </header>
  );
}
