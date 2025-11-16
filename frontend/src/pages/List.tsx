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
import {useState} from 'react';

export default function List() {
    const dispatch = useAppDispatch();
    const {filters: currentFilters, hasActiveFilters} = useAdsFiltersState();
    const {ads, pagination, loading, error} = useAdsData(currentFilters);
    const {setPage} = useAdsFilters();

    const [tempFilters, setTempFilters] = useState<AdsFiltersType>(currentFilters);

    const handleFiltersChange = (newFilters: Partial<AdsFiltersType>) => {
        setTempFilters(prev => ({
            ...prev,
            ...newFilters
        }));
    };

    const handleApplyFilters = () => {
        dispatch(setFilters(tempFilters));
    };

    const handleResetFilters = () => {
        const defaultFilters = {
            page: 1,
            limit: 10,
            sortBy: 'createdAt',
            sortOrder: 'desc'
        } as AdsFiltersType;

        setTempFilters(defaultFilters);
        dispatch(setFilters(defaultFilters));
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
                filters={tempFilters}
                onFiltersChange={handleFiltersChange}
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
            />

            <AdsState
                loading={loading}
                error={error}
                empty={!loading && ads.length === 0}
                hasActiveFilters={hasActiveFilters()}
                onRetry={() => {
                }}
                onResetFilters={handleResetFilters}
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