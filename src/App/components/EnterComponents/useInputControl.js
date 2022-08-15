import { useState, useEffect } from 'react';

const validationCheck = (inputValue, validations) => {
  const [inputEmptyError, setInputEmptyError] = useState('');
  const [minLengthError, setMinLengthError] = useState('');
  const [emailValidationError, setIsEmailValidationError] = useState('');
  const [isInputValid, setIsInputValid] = useState('');
  const emailRegexValidation =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          inputValue.length < validations[validation]
            ? setMinLengthError('must be more than ' + validations[validation] + ' character')
            : setMinLengthError('');
          break;
        case 'isInputEmpty':
          !inputValue ? setInputEmptyError("input can't be empty") : setInputEmptyError('');
          break;
        case 'isEmailValid':
          !emailRegexValidation.test(String(inputValue).toLowerCase())
            ? setIsEmailValidationError('email not correct ')
            : setIsEmailValidationError('');
          break;
      }
    }
  }, [inputValue]);

  useEffect(() => {
    if (inputEmptyError || minLengthError || emailValidationError) {
      setIsInputValid(false);
    } else {
      setIsInputValid(true);
    }
  }, [inputEmptyError, minLengthError, emailValidationError]);

  return {
    inputEmptyError,
    minLengthError,
    emailValidationError,
    isInputValid,
  };
};

const useInputControl = (initialValue, validations) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const [isInputSelected, setIsInputSelectedy] = useState(false);
  const onBlur = () => {
    setIsInputSelectedy(true);
  };

  const onChange = (event) => {
    setInputValue(event.target.value);
  };

  const validationResult = validationCheck(inputValue, validations);
  return {
    inputValue,
    onChange,
    onBlur,
    validationResult,
    isInputSelected,
  };
};

export { useInputControl };
