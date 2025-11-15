import type {AdsFilters, AdsResponse} from '@/types/ads';
import {apiClient} from '@/services/api/client';

export const adsApi = {
    getAds: async (filters: AdsFilters): Promise<AdsResponse> => {
        const params = new URLSearchParams();

        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());
        if (filters.sortBy) params.append('sortBy', filters.sortBy);
        if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
        if (filters.search) params.append('search', filters.search);
        if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());

        if (filters.status && filters.status.length > 0) {
            filters.status.forEach(status => params.append('status', status));
        }

        if (filters.priority) {
            params.append('priority', filters.priority);
        }

        if (filters.categoryId !== undefined) {
            params.append('categoryId', filters.categoryId.toString());
        }

        return apiClient.get<AdsResponse>(`/ads?${params.toString()}`);
    }
};