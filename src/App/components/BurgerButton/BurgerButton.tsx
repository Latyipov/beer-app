import React, { FC } from 'react';
import './BurgerButton.scss';

type BurgerButtonProps = {
  isBurgerOpen: boolean;
  setIsBurgerOpen: (isOpen: boolean) => void;
};

const BurgerButton: FC<BurgerButtonProps> = ({ isBurgerOpen, setIsBurgerOpen }) => {
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
};
export { BurgerButton };
