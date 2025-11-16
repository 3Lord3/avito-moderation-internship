import {useCallback} from 'react';
import {useAppDispatch} from '@/hooks/redux';
import {setFilters} from '@/store/ads/adsSlice';
import type {SortField, SortOrder} from '@/types/ads';

export function useAdsFilters() {
    const dispatch = useAppDispatch();

    const resetFilters = useCallback(() => {
        const defaultFilters = {
            page: 1,
            limit: 10,
            sortBy: 'createdAt' as SortField,
            sortOrder: 'desc' as SortOrder,
            status: [],
            categoryId: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            search: '',
            priority: undefined,
        };

        dispatch(setFilters(defaultFilters));
    }, [dispatch]);

    const setPage = useCallback((page: number) => {
        dispatch(setFilters({page}));
    }, [dispatch]);

    return {
        resetFilters,
        setPage,
    };
}