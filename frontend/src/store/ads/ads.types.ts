import type {Ad, AdsFilters, PaginationInfo} from '@/types/ads';

export interface AdsState {
    items: Ad[];
    currentAd: Ad | null;
    filters: AdsFilters;
    pagination: PaginationInfo;
    loading: boolean;
    error: string | null;
    actionLoading: boolean;
}