import React, { FC } from 'react';
import './ValidationErrors.scss';

type validationResultParameters = {
  inputEmptyError: string | null;
  minLengthError: string | null;
  emailValidationError: string | null;
  isInputValid: boolean;
};
type ValidationErrorsProps = {
  validationResult: validationResultParameters;
};
const ValidationErrors: FC<ValidationErrorsProps> = ({ validationResult }) => {
  return (
    <ul className='error-list'>
      {!!validationResult &&
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
