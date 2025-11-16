import {useState} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {
    useGetActivityDataQuery,
    useGetCategoriesDataQuery,
    useGetDecisionsDataQuery,
    useGetStatsSummaryQuery
} from '@/services/api/statsApi';
import type {StatsFilters} from '@/types/stats';
import {StatsMetrics} from '@/components/stats/StatsMetrics';
import {ActivityChart} from '@/components/stats/ActivityChart';
import {DecisionsChart} from '@/components/stats/DecisionsChart';
import {CategoriesChart} from '@/components/stats/CategoriesChart';

export default function Stats() {
    const [filters, setFilters] = useState<StatsFilters>({period: 'week'});

    const {data: statsSummary, isLoading: summaryLoading} = useGetStatsSummaryQuery(filters);
    const {data: activityData, isLoading: activityLoading} = useGetActivityDataQuery(filters);
    const {data: decisionsData, isLoading: decisionsLoading} = useGetDecisionsDataQuery(filters);
    const {data: categoriesData, isLoading: categoriesLoading} = useGetCategoriesDataQuery(filters);

    const handlePeriodChange = (period: 'today' | 'week' | 'month') => {
        setFilters({period});
    };

    const isLoading = summaryLoading || activityLoading || decisionsLoading || categoriesLoading;

    if (isLoading) {
        return (
            <div className="container mx-auto p-6">
                <div className="text-center">Загрузка статистики...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Моя статистика модерации</h1>
                <div className="text-sm text-muted-foreground">
                    Обновлено: {new Date().toLocaleDateString('ru-RU')} {new Date().toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit'
                })}
                </div>
            </div>

            <Tabs defaultValue="week" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="today" onClick={() => handlePeriodChange('today')}>
                        Сегодня
                    </TabsTrigger>
                    <TabsTrigger value="week" onClick={() => handlePeriodChange('week')}>
                        Неделя
                    </TabsTrigger>
                    <TabsTrigger value="month" onClick={() => handlePeriodChange('month')}>
                        Месяц
                    </TabsTrigger>
                </TabsList>

                <TabsContent value={filters.period || 'week'} className="space-y-6">
                    {statsSummary && <StatsMetrics stats={statsSummary}/>}

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                        {activityData && (
                            <div className="col-span-3">
                                <ActivityChart data={activityData}/>
                            </div>
                        )}

                        {decisionsData && (
                            <div className="col-span-2">
                                <DecisionsChart data={decisionsData}/>
                            </div>
                        )}

                        {categoriesData && (
                            <div className="col-span-5">
                                <CategoriesChart data={categoriesData}/>
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}