import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '@/App/Redux/store/slices/userSlice';
import { useDispatch } from 'react-redux';

export function AuthorizationForm() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [emailClicked, setEmailClicked] = useState(false);
  const [passwordClicked, setPasswordClicked] = useState(false);
  const [emailError, setEmailError] = useState("email can't be empty");
  const [passwordError, setPasswordError] = useState("password can't be empty");
  const [formValid, setFormValid] = useState(false);

  const [invalidError, setInvalidError] = useState('');

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'Email':
        setEmailClicked(true);
        break;
      case 'Password':
        setPasswordClicked(true);
        break;
    }
  };
  const emailHandler = (event) => {
    setEmail(event.target.value);
    const regexValidation =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regexValidation.test(String(event.target.value).toLowerCase())) {
      setEmailError('email not correct ');
    } else {
      setEmailError('');
    }
  };

  const passwordHandler = (event) => {
    setPass(event.target.value);

    if (event.target.value.length < 4) {
      setPasswordError('password should be more 4 symbols');
      if (!event.target.value) {
        setPasswordError("password can't be empty");
      }
    } else {
      setPasswordError('');
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmitClick = (event) => {
    event.preventDefault();

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          }),
        );

        navigate('/');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          setInvalidError('Wrong email. Try again.');
        } else if (error.code === 'auth/wrong-password') {
          setInvalidError('Wrong password. Try again.');
        } else {
          setInvalidError('Something wrong!');
        }
      });
  };

  return (
    <div className='EnterForm'>
      <h2>Authorization</h2>
      <form>
        {emailClicked && emailError && <div className='error'>{emailError}</div>}
        <input
          className='EnterForm__item'
          type='email'
          name='Email'
          placeholder='Email'
          value={email}
          onBlur={(event) => blurHandler(event)}
          onChange={(event) => emailHandler(event)}
        />
        {passwordClicked && passwordError && <div className='error'>{passwordError}</div>}
        <input
          className='EnterForm__item'
          type='password'
          name='Password'
          placeholder='Password'
          value={pass}
          onBlur={(event) => blurHandler(event)}
          onChange={(event) => passwordHandler(event)}
        />
        <button disabled={!formValid} className='btn' type='submit' onClick={onFormSubmitClick}>
          Enter
        </button>
      </form>
      <div className='error'>{invalidError}</div>
    </div>
  );
}
