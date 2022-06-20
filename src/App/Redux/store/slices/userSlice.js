import { createSlice } from '@reduxjs/toolkit';
import { loadStateToLocalStorage, saveStateToLocalStorage } from './lockalStorageFunctions';

const initialState = loadStateToLocalStorage();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      saveStateToLocalStorage(state);
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      localStorage.clear();
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
