import { configureStore } from '@reduxjs/toolkit';
import authReducer from './../reducers/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const reducers = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;