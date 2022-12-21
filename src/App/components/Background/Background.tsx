import React, { FC } from 'react';
import './Background.scss';

type BackgroundProps = {
  backgroundImageLink: string;
};

const Background: FC<BackgroundProps> = ({ backgroundImageLink }) => {
  return (
    <div className='background' style={{ backgroundImage: `url(${backgroundImageLink})` }}>
      <div className='background__blur'></div>
    </div>
  );
};
export { Background };
