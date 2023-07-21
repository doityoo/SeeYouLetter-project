import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authSlice';
import textBodyReducer from '../reducers/textBodySlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, PURGE, PERSIST, persistStore } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
// import logger from 'redux-logger';

const reducers = combineReducers({
	auth: authReducer,
	textBody: textBodyReducer,
});

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		//미들웨어 작성시 에러 주의
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [PERSIST, PURGE],
			},
		}),
	// .concat(logger)
});

const persistor = persistStore(store); // persistStore 함수로 persistor를 생성합니다.

export { store, persistor };
