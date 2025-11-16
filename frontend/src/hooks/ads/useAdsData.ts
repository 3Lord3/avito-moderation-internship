import {useGetAdsQuery} from '@/services/api/adsApi';
import type {AdsFilters} from '@/types/ads';

export function useAdsData(filters: AdsFilters) {
    const {data, isLoading: loading, error: queryError} = useGetAdsQuery(filters);

    const ads = data?.ads || [];
    const pagination = data?.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
    };

    const error = queryError ? 'Ошибка при загрузке объявлений' : null;

    return {
        ads,
        pagination,
        loading,
        error,
    };
}