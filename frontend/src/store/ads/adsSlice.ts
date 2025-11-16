import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import type {AdsFilters} from '@/types/ads';
import type {AdsState} from './ads.types';

const initialState: AdsState = {
    items: [],
    currentAd: null,
    filters: {
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc',
        status: [],
        search: '',
    },
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
    },
    loading: false,
    error: null,
    actionLoading: false,
};

const adsSlice = createSlice({
    name: 'ads',
    initialState,
    reducers: {
        setCurrentAd: (state, action: PayloadAction<any>) => {
            state.currentAd = action.payload;
        },
        setFilters: (state, action: PayloadAction<Partial<AdsFilters>>) => {
            state.filters = {...state.filters, ...action.payload};
        },
        clearError: (state) => {
            state.error = null;
        },
        setActionLoading: (state, action: PayloadAction<boolean>) => {
            state.actionLoading = action.payload;
        },
    },
});

export const {
    setCurrentAd,
    setFilters,
    clearError,
    setActionLoading,
} = adsSlice.actions;

export default adsSlice.reducer;