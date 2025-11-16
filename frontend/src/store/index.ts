import {configureStore} from '@reduxjs/toolkit';
import {adsApi} from '@/services/api/adsApi';
import {statsApi} from '@/services/api/statsApi';
import {moderatorApi} from '@/services/api/moderatorApi';
import adsReducer from './ads/adsSlice';

export const store = configureStore({
    reducer: {
        ads: adsReducer,
        [adsApi.reducerPath]: adsApi.reducer,
        [statsApi.reducerPath]: statsApi.reducer,
        [moderatorApi.reducerPath]: moderatorApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(adsApi.middleware)
            .concat(statsApi.middleware)
            .concat(moderatorApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;