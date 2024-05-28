import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/authSlice';
import { authApi } from './services/auth';
import { baseApi } from './services/api';
import authSlice from '../features/auth/authSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import dashboardSlice from '../features/auth/dashboardSlice';

const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
  blacklist: [authApi.reducerPath],
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    dashboard: dashboardSlice
    // transaction: transactionSlice,
    // pos: posSlice,
    // loan: loanSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([authApi.middleware, baseApi.middleware]),
  devTools: import.meta.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
