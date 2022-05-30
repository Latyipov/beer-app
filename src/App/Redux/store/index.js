import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/App/Redux/store/slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
