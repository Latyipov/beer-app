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

type SliceState = {
  email: string | null;
  name: string | null;
  token: string | null;
  id: string | null;
};

export const saveStateToLocalStorage = (state: SliceState) => {
  !!state.email && localStorage.setItem('email', state.email);
  !!state.name && localStorage.setItem('name', state.name);
  !!state.token && localStorage.setItem('token', state.token);
  !!state.id && localStorage.setItem('id', state.id);
};
