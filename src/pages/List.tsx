import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {AdCard} from '@/components/ads/AdCard';
import {AdsFilters} from '@/components/ads/AdsFilters';
import {AdsState} from '@/components/ads/AdsState';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import {useGetAdsQuery} from '@/services/api/adsApi';
import {setFilters} from '@/store/ads/adsSlice';
import type {SortField, SortOrder} from '@/types/ads';

export default function List() {
    const dispatch = useAppDispatch();
    const {filters} = useAppSelector((state) => state.ads);

    const {data, isLoading: loading, error: queryError} = useGetAdsQuery(filters);

    const ads = data?.ads || [];
    const pagination = data?.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
    };

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > pagination.totalPages) return;

        dispatch(setFilters({page: newPage}));
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const applyFilters = () => {
        dispatch(setFilters({...filters, page: 1}));
    };

    const resetFilters = () => {
        const defaultFilters = {
            page: 1,
            limit: 10,
            sortBy: 'createdAt' as SortField,
            sortOrder: 'desc' as SortOrder,
            status: [],
            categoryId: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            search: '',
            priority: undefined,
        };

        dispatch(setFilters(defaultFilters));
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const hasActiveFilters = () => {
        return Boolean(
            (filters.status && filters.status.length > 0) ||
            filters.priority ||
            filters.categoryId ||
            filters.minPrice ||
            filters.maxPrice ||
            filters.search
        );
    };

    const error = queryError ? 'Ошибка при загрузке объявлений' : null;

    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Список объявлений</h1>
                <div className="text-sm text-muted-foreground">
                    Показано {ads.length} из {pagination.totalItems} объявлений
                </div>
            </div>

            <AdsFilters
                filters={filters}
                onFiltersChange={(newFilters) => dispatch(setFilters(newFilters))}
                onApplyFilters={applyFilters}
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
                    <div className="space-y-4 mb-6">
                        {ads.map((ad) => (
                            <AdCard key={ad.id} ad={ad}/>
                        ))}
                    </div>

                    {pagination.totalPages > 1 && (
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                                        className={
                                            pagination.currentPage === 1
                                                ? "pointer-events-none opacity-50"
                                                : "cursor-pointer"
                                        }
                                    />
                                </PaginationItem>

                                {getPageNumbers().map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            onClick={() => handlePageChange(page)}
                                            isActive={page === pagination.currentPage}
                                            className="cursor-pointer"
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                                        className={
                                            pagination.currentPage === pagination.totalPages
                                                ? "pointer-events-none opacity-50"
                                                : "cursor-pointer"
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </>
            )}
        </div>
    );
}