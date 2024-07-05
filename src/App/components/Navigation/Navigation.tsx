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
  const pages: { name: string; path: string }[] = [
    { name: 'Home', path: '/main' },
    { name: 'All beers', path: '/all-beer' },
    { name: 'Favorite beers', path: '/favorites' },
  ];

  return (
    <nav className={`navigation ${isBurgerOpen && 'navigation--open'}`}>
      <ul className='navigation__list'>
        {pages.map((page) => (
          <li className='navigation__list-item' key={page.name}>
            <Link
              className={`navigation__link ${
                checkLocation(page.path) && 'navigation__link--active'
              }`}
              to={page.path}
            >
              {page.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { Navigation };
