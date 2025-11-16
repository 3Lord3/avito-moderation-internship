import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import type {StatsSummary} from '@/types/stats';

interface StatsMetricsProps {
    stats: StatsSummary;
}

export function StatsMetrics({stats}: StatsMetricsProps) {
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Всего проверено</CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                         className="h-4 w-4 text-muted-foreground">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                    </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalReviewed}</div>
                    <p className="text-xs text-muted-foreground">
                        объявлений
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Одобрено</CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                         className="h-4 w-4 text-muted-foreground">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.approvedPercentage.toFixed(1)}%</div>
                    <p className="text-xs text-muted-foreground">
                        от проверенных
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Отклонено</CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                         className="h-4 w-4 text-muted-foreground">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.rejectedPercentage.toFixed(1)}%</div>
                    <p className="text-xs text-muted-foreground">
                        от проверенных
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Среднее время</CardTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                         className="h-4 w-4 text-muted-foreground">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatTime(stats.averageReviewTime)}</div>
                    <p className="text-xs text-muted-foreground">
                        на объявление
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}