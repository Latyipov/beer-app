import React from 'react';

export function ValidationErrors({ isInputSelected, validationResult }) {
  return (
    <div>
      {isInputSelected &&
        validationResult &&
        Object.keys(validationResult).map((error) => (
          <div key={error} className='error'>
            {validationResult[error]}
          </div>
        ))}
    </div>
  );
}
