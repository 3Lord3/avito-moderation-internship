import {useAppSelector} from '@/hooks/redux';

export function useAdsFiltersState() {
    const {filters} = useAppSelector((state) => state.ads);

    const hasActiveFilters = (): boolean => {
        return Boolean(
            (filters.status && filters.status.length > 0) ||
            filters.priority ||
            filters.categoryId ||
            filters.minPrice ||
            filters.maxPrice ||
            filters.search
        );
    };

    return {
        filters,
        hasActiveFilters,
    };
}