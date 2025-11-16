import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const API_BASE = `/api/v1`;

export interface ModeratorStats {
    totalReviewed: number;
    todayReviewed: number;
    thisWeekReviewed: number;
    thisMonthReviewed: number;
    averageReviewTime: number;
    approvalRate: number;
}

export interface Moderator {
    id: number;
    name: string;
    email: string;
    role: string;
    statistics: ModeratorStats;
    permissions: string[];
}

export const moderatorApi = createApi({
    reducerPath: 'moderatorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE}/moderators`,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Moderator'],
    endpoints: (builder) => ({
        getCurrentModerator: builder.query<Moderator, void>({
            query: () => '/me',
            providesTags: ['Moderator'],
        }),
    }),
});

export const {useGetCurrentModeratorQuery} = moderatorApi;