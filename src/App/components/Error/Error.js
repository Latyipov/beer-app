import React from 'react';
import PropTypes from 'prop-types';
import './Error.scss';

export function Error({ errorMessage }) {
  return <div className='error-message'>{errorMessage}</div>;
}
Error.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};
