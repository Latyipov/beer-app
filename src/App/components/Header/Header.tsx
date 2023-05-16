import React, { useState } from 'react';
import { BurgerButton } from '../BurgerButton/BurgerButton';
import { Navigation } from '../Navigation/Navigation';
import { getAuth, signOut } from 'firebase/auth';

import UserState from '@/App/services/MobX/store/UserState';

import './Header.scss';

export function Header() {
  const userName = UserState.userStateData.name;
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);

  const signOutUser = () => {
    signOut(getAuth());
    UserState.removeStateUser();
  };

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
      <button className='header__out-button' onClick={signOutUser}>
        Sign out
      </button>
    </header>
  );
}
