import React, { FC } from 'react';
import './ValidationErrors.scss';

type ValidationErrorsProps = {
  isInputSelected: boolean;
  validationResult: validationResultParameters;
};
type validationResultParameters = {
  inputEmptyError: string | null;
  minLengthError: string | null;
  emailValidationError: string | null;
  isInputValid: boolean;
};

const ValidationErrors: FC<ValidationErrorsProps> = ({ isInputSelected, validationResult }) => {
  return (
    <ul className='error-list'>
      {isInputSelected &&
        !!validationResult &&
        Object.keys(validationResult).map(
          (errorKey: string) =>
            !!validationResult[errorKey as keyof validationResultParameters] &&
            !validationResult.isInputValid && (
              <li key={errorKey} className='error-list__error'>
                {validationResult[errorKey as keyof validationResultParameters]}
              </li>
            ),
        )}
    </ul>
  );
};

export { ValidationErrors };
