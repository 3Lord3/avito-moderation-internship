import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {ActivityData, CategoryData, DecisionsData, StatsFilters, StatsSummary} from '@/types/stats';

const API_BASE = `/api/v1`;

export const statsApi = createApi({
    reducerPath: 'statsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE}/stats`,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Stats'],
    endpoints: (builder) => ({
        getStatsSummary: builder.query<StatsSummary, StatsFilters>({
            query: (filters) => {
                const params = new URLSearchParams();

                if (filters.period) params.append('period', filters.period);
                if (filters.startDate) params.append('startDate', filters.startDate);
                if (filters.endDate) params.append('endDate', filters.endDate);

                return `/summary?${params.toString()}`;
            },
            providesTags: ['Stats'],
        }),

        getActivityData: builder.query<ActivityData[], StatsFilters>({
            query: (filters) => {
                const params = new URLSearchParams();

                if (filters.period) params.append('period', filters.period);
                if (filters.startDate) params.append('startDate', filters.startDate);
                if (filters.endDate) params.append('endDate', filters.endDate);

                return `/chart/activity?${params.toString()}`;
            },
            providesTags: ['Stats'],
        }),

        getDecisionsData: builder.query<DecisionsData, StatsFilters>({
            query: (filters) => {
                const params = new URLSearchParams();

                if (filters.period) params.append('period', filters.period);
                if (filters.startDate) params.append('startDate', filters.startDate);
                if (filters.endDate) params.append('endDate', filters.endDate);

                return `/chart/decisions?${params.toString()}`;
            },
            providesTags: ['Stats'],
        }),

        getCategoriesData: builder.query<CategoryData, StatsFilters>({
            query: (filters) => {
                const params = new URLSearchParams();

                if (filters.period) params.append('period', filters.period);
                if (filters.startDate) params.append('startDate', filters.startDate);
                if (filters.endDate) params.append('endDate', filters.endDate);

                return `/chart/categories?${params.toString()}`;
            },
            providesTags: ['Stats'],
        }),
    }),
});

export const {
    useGetStatsSummaryQuery,
    useGetActivityDataQuery,
    useGetDecisionsDataQuery,
    useGetCategoriesDataQuery,
} = statsApi;