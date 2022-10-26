import React from 'react';

import './BurgerButton.scss';

export function BurgerButton({ isBurgerOpen, setIsBurgerOpen }) {
  return (
    <button
      className={`burger-button ${isBurgerOpen && 'burger-button--fixed'} `}
      onClick={() => setIsBurgerOpen(!isBurgerOpen)}
    >
      <div className={`burger-button__line ${isBurgerOpen && 'burger-button__line--transform'}`} />
      <div className={`burger-button__line ${isBurgerOpen && 'burger-button__line--transform'}`} />
      <div className={`burger-button__line ${isBurgerOpen && 'burger-button__line--transform'}`} />
    </button>
  );
}
