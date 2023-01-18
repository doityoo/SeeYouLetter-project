import { configureStore } from '@reduxjs/toolkit';
import authReducer from './../reducers/authSlice'
import storage from 'redux-persistence/storage'

  const store = configureStore({
  reducer: {
      auth: authReducer
  },
  });

export default store;