export const loadStateToLocalStorage = () => {
  if (
    localStorage.email !== undefined &&
    localStorage.email !== 'null' &&
    localStorage.id !== undefined &&
    localStorage.id !== 'null' &&
    localStorage.token !== undefined &&
    localStorage.token !== 'null'
  ) {
    return {
      email: localStorage.getItem('email'),
      token: localStorage.getItem('token'),
      id: localStorage.getItem('id'),
    };
  } else {
    return {
      email: null,
      token: null,
      id: null,
    };
  }
};
export const saveStateToLocalStorage = (state) => {
  localStorage.setItem('email', state.email);
  localStorage.setItem('token', state.token);
  localStorage.setItem('id', state.id);
};
