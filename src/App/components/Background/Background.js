import React from 'react';
import PropTypes from 'prop-types';
import './Background.scss';

export function Background({ backgroundImageLink }) {
  return (
    <div className='background' style={{ backgroundImage: `url(${backgroundImageLink})` }}>
      <div className='background__blur'></div>
    </div>
  );
}

Background.propTypes = {
  backgroundImageLink: PropTypes.string.isRequired,
};
