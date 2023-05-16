import React, { FC } from 'react';
import './Error.scss';

type ErrorProps = {
  message: string;
};

const Error: FC<ErrorProps> = ({ message }) => {
  return <div className='error-message'>{message}</div>;
};

export { Error };
