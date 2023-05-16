import React, { useState, useEffect, FC } from 'react';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import './UpScrollButton.scss';

export const UpScrollButton: FC = () => {
  const [isUpButtonActive, setIsUpButtonActive] = useState<boolean>(false);

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
    <button
      className={`up-button ${isUpButtonActive && 'up-button--active'}`}
      onClick={onUpButtonClick}
    >
      <ArrowCircleUpIcon style={{ fontSize: '4rem', fill: 'white' }} />
    </button>
  );
};
