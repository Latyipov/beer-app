import React from 'react';
import './ValidationErrors.scss';

export function ValidationErrors({ isInputSelected, validationResult }) {
  return (
    <ul className='error-list'>
      {isInputSelected &&
        validationResult &&
        Object.keys(validationResult).map((error) =>
          validationResult[error] && !validationResult.isInputValid ? (
            <li key={error} className='error'>
              {validationResult[error]}
            </li>
          ) : (
            ''
          ),
        )}
    </ul>
  );
}
