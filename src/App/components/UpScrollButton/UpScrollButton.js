import React, { useState, useEffect } from 'react';
import './UpScrollButton.scss';

export function UpScrollButton() {
  const [isUpButtonActive, setIsUpButtonActive] = useState(false);

  const onUpButtonClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  const handleScroll = () => {
    const element = document.documentElement;
    const scrollTotal = element.scrollHeight - element.clientHeight;
    if (element.scrollTop / scrollTotal > 0.2) {
      setIsUpButtonActive(true);
    } else {
      setIsUpButtonActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <button
        className={`up-button ${isUpButtonActive && 'up-button__active'}`}
        onClick={onUpButtonClick}
      >
        UPBLYA
      </button>
    </>
  );
}
