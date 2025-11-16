import {configureStore} from '@reduxjs/toolkit';
import {adsApi} from '@/services/api/adsApi';
import adsReducer from './ads/adsSlice';

export const store = configureStore({
    reducer: {
        ads: adsReducer,
        [adsApi.reducerPath]: adsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(adsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;