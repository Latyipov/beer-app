import { useState, useEffect, ChangeEvent } from 'react';

type ValidationParameters = {
  isInputEmpty: boolean;
  minLength: number;
  isEmailValid?: boolean;
};

const validationCheck = (inputValue: string, validations: ValidationParameters) => {
  const [inputEmptyError, setInputEmptyError] = useState<null | string>(null);
  const [minLengthError, setMinLengthError] = useState<null | string>(null);
  const [emailValidationError, setIsEmailValidationError] = useState<null | string>(null);
  const [isInputValid, setIsInputValid] = useState<boolean>(false);
  const emailRegexValidation =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          inputValue.length < validations[validation]
            ? setMinLengthError('must be more than ' + validations[validation] + ' character')
            : setMinLengthError(null);
          break;
        case 'isInputEmpty':
          !inputValue ? setInputEmptyError("input can't be empty") : setInputEmptyError(null);
          break;
        case 'isEmailValid':
          !emailRegexValidation.test(String(inputValue).toLowerCase())
            ? setIsEmailValidationError('email not correct ')
            : setIsEmailValidationError(null);
          break;
      }
    }
  }, [inputValue]);

  useEffect(() => {
    if (!!inputEmptyError || !!minLengthError || !!emailValidationError) {
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

const useInputControl = (initialValue: string, validations: ValidationParameters) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isInputSelected, setIsInputSelected] = useState(false);

  const onBlur = () => {
    setIsInputSelected(true);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.trim());
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
