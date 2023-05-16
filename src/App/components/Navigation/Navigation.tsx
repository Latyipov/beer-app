import React, { FC } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import './Navigation.scss';

type NavigationProps = {
  isBurgerOpen: boolean;
};

const Navigation: FC<NavigationProps> = ({ isBurgerOpen }) => {
  const { pathname } = useLocation();
  const checkLocation = (location: string) => {
    if (matchPath({ path: location, end: true }, pathname)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <nav className={`navigation ${isBurgerOpen && 'navigation--open'}`}>
      <ul className='navigation__list'>
        <li className='navigation__list-item'>
          <Link
            className={`navigation__link ${checkLocation('/main') && 'navigation__link--active'}`}
            to='/main'
          >
            Home
          </Link>
        </li>
        <li className='navigation__list-item'>
          <Link
            className={`navigation__link ${
              checkLocation('/all-beer') && 'navigation__link--active'
            }`}
            to='/all-beer'
          >
            All beers
          </Link>
        </li>
        <li className='navigation__list-item'>
          <Link
            className={`navigation__link ${
              checkLocation('/favorites') && 'navigation__link--active'
            }`}
            to='/favorites'
          >
            Favorite beers
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export { Navigation };
