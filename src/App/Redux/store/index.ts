import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/App/Redux/store/slices/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type UserState = ReturnType<typeof store.getState>;
