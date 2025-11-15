import {apiClient} from './client';
import type {AdsFilters, AdsResponse} from '@/types/ads';

function buildAdsQueryString(params: AdsFilters): string {
    const searchParams = new URLSearchParams();

    searchParams.set('page', String(params.page || 1));
    searchParams.set('limit', String(params.limit || 10));

    if (params.status?.length) {
        params.status.forEach(s => searchParams.append('status', s));
    }

    if (params.categoryId !== undefined) {
        searchParams.set('categoryId', String(params.categoryId));
    }

    if (params.minPrice !== undefined) {
        searchParams.set('minPrice', String(params.minPrice));
    }

    if (params.maxPrice !== undefined) {
        searchParams.set('maxPrice', String(params.maxPrice));
    }

    if (params.search) {
        searchParams.set('search', params.search);
    }

    if (params.sortBy) {
        searchParams.set('sortBy', params.sortBy);
    }

    if (params.sortOrder) {
        searchParams.set('sortOrder', params.sortOrder);
    }

    return searchParams.toString();
}

export const adsApi = {
    getAds: (filters: AdsFilters = {}) => {
        const queryString = buildAdsQueryString(filters);
        return apiClient.get<AdsResponse>(`/ads?${queryString}`);
    },
};