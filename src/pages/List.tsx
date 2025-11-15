import {useEffect, useState} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {AdCard} from '@/components/ads/AdCard';
import {adsApi} from '@/services/api/ads';
import type {Ad, AdsFilters} from '@/types/ads';

export default function List() {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<AdsFilters>({
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc',
    });

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
    });

    useEffect(() => {
        fetchAds();
    }, [filters.page]);

    const fetchAds = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await adsApi.getAds(filters);
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

        setFilters(prev => ({
            ...prev,
            page: newPage
        }));

        window.scrollTo({top: 0, behavior: 'smooth'});
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

    if (error) {
        return (
            <div className="container mx-auto">
                <Card>
                    <CardContent className="p-6">
                        <div className="text-center text-red-600">
                            <h2 className="text-xl font-semibold mb-2">Ошибка</h2>
                            <p>{error}</p>
                            <Button onClick={fetchAds} className="mt-4">
                                Попробовать снова
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Список объявлений</h1>
                <div className="text-sm text-muted-foreground">
                    Показано {ads.length} из {pagination.totalItems} объявлений
                </div>
            </div>

            <div>
                {loading ? (
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-center">Загрузка объявлений...</div>
                        </CardContent>
                    </Card>
                ) : ads.length === 0 ? (
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-center text-muted-foreground">
                                <div className="text-4xl mb-4">📭</div>
                                <h3 className="text-lg font-semibold mb-2">Объявления не найдены</h3>
                                <p>На данный момент нет объявлений</p>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
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
        </div>
    );
}