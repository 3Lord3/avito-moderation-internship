import {AdsFilters} from '@/components/ads/AdsFilters';
import {AdsState} from '@/components/ads/AdsState';
import {AdsHeader} from '@/components/ads/AdsHeader';
import {AdsList} from '@/components/ads/AdsList';
import {AdsPagination} from '@/components/ads/AdsPagination';
import {useAdsData} from '@/hooks/ads/useAdsData';
import {useAdsFiltersState} from '@/hooks/ads/useAdsFiltersState';
import {useAdsFilters} from '@/hooks/ads/useAdsFilters';
import {useAppDispatch} from '@/hooks/redux';
import {setFilters} from '@/store/ads/adsSlice';
import type {AdsFilters as AdsFiltersType} from '@/types/ads';

export default function List() {
    const dispatch = useAppDispatch();
    const {filters, hasActiveFilters} = useAdsFiltersState();
    const {ads, pagination, loading, error} = useAdsData(filters);
    const {resetFilters, setPage} = useAdsFilters();

    const handleFiltersChange = (newFilters: Partial<AdsFiltersType>) => {
        dispatch(setFilters(newFilters));
    };

    const handleApplyFilters = () => {
        dispatch(setFilters({...filters, page: 1}));
    };

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > pagination.totalPages) return;
        setPage(newPage);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <div className="container mx-auto">
            <AdsHeader adsCount={ads.length} totalItems={pagination.totalItems}/>

            <AdsFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onApplyFilters={handleApplyFilters}
                onResetFilters={resetFilters}
            />

            <AdsState
                loading={loading}
                error={error}
                empty={!loading && ads.length === 0}
                hasActiveFilters={hasActiveFilters()}
                onRetry={() => {
                }}
                onResetFilters={resetFilters}
            />

            {!loading && error === null && ads.length > 0 && (
                <>
                    <AdsList ads={ads}/>
                    <AdsPagination pagination={pagination} onPageChange={handlePageChange}/>
                </>
            )}
        </div>
    );
}