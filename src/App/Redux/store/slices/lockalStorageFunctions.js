export const loadStateToLocalStorage = () => {
  if (
    localStorage.email !== undefined &&
    localStorage.email !== 'null' &&
    localStorage.name !== undefined &&
    localStorage.name !== 'null' &&
    localStorage.id !== undefined &&
    localStorage.id !== 'null' &&
    localStorage.token !== undefined &&
    localStorage.token !== 'null'
  ) {
    return {
      email: localStorage.getItem('email'),
      name: localStorage.getItem('name'),
      token: localStorage.getItem('token'),
      id: localStorage.getItem('id'),
    };
  } else {
    return {
      email: null,
      name: null,
      token: null,
      id: null,
    };
  }
};
export const saveStateToLocalStorage = (state) => {
  localStorage.setItem('email', state.email);
  localStorage.setItem('name', state.name);
  localStorage.setItem('token', state.token);
  localStorage.setItem('id', state.id);
};
