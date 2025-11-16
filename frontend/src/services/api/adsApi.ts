import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {Ad, AdsFilters, AdsResponse} from '@/types/ads';
import {statsApi} from "@/services/api/statsApi";

const API_BASE = `/api/v1`;

export const adsApi = createApi({
    reducerPath: 'adsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE}/ads`,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Ad', 'AdsList'],
    endpoints: (builder) => ({
        getAds: builder.query<AdsResponse, AdsFilters>({
            query: (filters) => {
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

                return `?${params.toString()}`;
            },
            providesTags: ['AdsList'],
        }),

        getAdById: builder.query<Ad, number>({
            query: (id) => `/${id}`,
            providesTags: (result) => result ? [{type: 'Ad' as const, id: result.id}] : ['Ad'],
        }),

        approveAd: builder.mutation<{ message: string; ad: Ad }, number>({
            query: (id) => ({
                url: `/${id}/approve`,
                method: 'POST',
            }),
            invalidatesTags: (result) => [
                {type: 'Ad', id: result?.ad.id},
                'AdsList'
            ],
            onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled;
                    dispatch(statsApi.util.invalidateTags(['Stats']));
                } catch (error) {
                }
            },
        }),

        rejectAd: builder.mutation<{ message: string; ad: Ad }, {
            id: number;
            data: { reason: string; comment?: string }
        }>({
            query: ({id, data}) => ({
                url: `/${id}/reject`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result) => [
                {type: 'Ad', id: result?.ad.id},
                'AdsList'
            ],
            onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled;
                    dispatch(statsApi.util.invalidateTags(['Stats']));
                } catch (error) {
                }
            },
        }),

        requestChanges: builder.mutation<{ message: string; ad: Ad }, {
            id: number;
            data: { reason: string; comment?: string }
        }>({
            query: ({id, data}) => ({
                url: `/${id}/request-changes`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result) => [
                {type: 'Ad', id: result?.ad.id},
                'AdsList'
            ],
            onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
                try {
                    await queryFulfilled;
                    dispatch(statsApi.util.invalidateTags(['Stats']));
                } catch (error) {
                }
            },
        }),
    }),
});

export const {
    useGetAdsQuery,
    useGetAdByIdQuery,
    useApproveAdMutation,
    useRejectAdMutation,
    useRequestChangesMutation,
} = adsApi;