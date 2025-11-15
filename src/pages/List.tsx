import {useEffect, useState} from 'react';
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
import {adsApi} from '@/services/api/ads';
import type {Ad, AdsFilters as IAdsFilters, AdsResponse, PaginationInfo, SortField, SortOrder} from '@/types/ads';

export default function List() {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<IAdsFilters>({
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc',
        status: [],
        categoryId: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        search: '',
        priority: undefined,
    });

    const [appliedFilters, setAppliedFilters] = useState<IAdsFilters>({
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc',
        status: [],
        categoryId: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        search: '',
        priority: undefined,
    });

    const [pagination, setPagination] = useState<PaginationInfo>({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
    });

    useEffect(() => {
        fetchAds();
    }, [
        appliedFilters.page,
        appliedFilters.limit,
        appliedFilters.sortBy,
        appliedFilters.sortOrder,
        appliedFilters.status,
        appliedFilters.priority,
        appliedFilters.categoryId,
        appliedFilters.minPrice,
        appliedFilters.maxPrice,
        appliedFilters.search
    ]);

    const fetchAds = async () => {
        try {
            setLoading(true);
            setError(null);
            const response: AdsResponse = await adsApi.getAds(appliedFilters);
            setAds(response.ads);
            setPagination(response.pagination);
        } catch (err) {
            setError('Ошибка при загрузке объявлений');
            console.error('Error fetching ads:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > pagination.totalPages) return;

        setAppliedFilters(prev => ({
            ...prev,
            page: newPage
        }));

        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const applyFilters = () => {
        setAppliedFilters({...filters, page: 1});
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

        setFilters(defaultFilters);
        setAppliedFilters(defaultFilters);
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
        return !!(
            (filters.status && filters.status.length > 0) ||
            filters.priority ||
            filters.categoryId ||
            filters.minPrice ||
            filters.maxPrice ||
            filters.search
        );
    };

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
                onFiltersChange={setFilters}
                onApplyFilters={applyFilters}
                onResetFilters={resetFilters}
            />

            <AdsState
                loading={loading}
                error={error}
                empty={!loading && ads.length === 0}
                hasActiveFilters={hasActiveFilters()}
                onRetry={fetchAds}
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