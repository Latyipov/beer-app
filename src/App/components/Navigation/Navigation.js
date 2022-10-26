import React from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import './Navigation.scss';

export function Navigation({ isBurgerOpen }) {
  const { pathname } = useLocation();
  const checkLocation = (location) => {
    if (matchPath({ path: location, exact: true, strict: false }, pathname)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <nav className={`navigation-box ${isBurgerOpen && 'navigation-box--isOpen'}`}>
      <ul className='navigation-box__list'>
        <li className='navigation-box__list-item'>
          <Link
            className={`navigation-box__link ${
              checkLocation('/main') && 'navigation-box__link--isActive'
            }`}
            to='/main'
          >
            Home
          </Link>
        </li>
        <li className='navigation-box__list-item'>
          <Link
            className={`navigation-box__link ${
              checkLocation('/all-beer') && 'navigation-box__link--isActive'
            }`}
            to='/all-beer'
          >
            All beer
          </Link>
        </li>
        <li className='navigation-box__list-item'>
          <Link
            className={`navigation-box__link ${
              checkLocation('/favorites') && 'navigation-box__link--isActive'
            }`}
            to='/favorites'
          >
            Favorite beer
          </Link>
        </li>
      </ul>
    </nav>
  );
}
