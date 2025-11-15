import type {Ad, AdsFilters, AdsResponse} from '@/types/ads';
import {API_BASE, apiClient} from './client';

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
    },

    getAdById: async (id: number): Promise<Ad> => {
        return apiClient.get<Ad>(`/ads/${id}`);
    },

    approveAd: async (id: number): Promise<{ message: string; ad: Ad }> => {
        const response = await fetch(`${API_BASE}/ads/${id}/approve`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('Failed to approve ad');
        }
        return response.json();
    },

    rejectAd: async (id: number, data: { reason: string; comment?: string }): Promise<{ message: string; ad: Ad }> => {
        const response = await fetch(`${API_BASE}/ads/${id}/reject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to reject ad');
        }
        return response.json();
    },

    requestChanges: async (id: number, data: { reason: string; comment?: string }): Promise<{
        message: string;
        ad: Ad
    }> => {
        const response = await fetch(`${API_BASE}/ads/${id}/request-changes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to request changes');
        }
        return response.json();
    },
};