import React from 'react';
import PropTypes from 'prop-types';
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
}

Navigation.propTypes = {
  isBurgerOpen: PropTypes.bool.isRequired,
};
