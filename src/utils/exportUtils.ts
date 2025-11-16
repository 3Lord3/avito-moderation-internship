import type {ActivityData, CategoryData, DecisionsData, StatsFilters, StatsSummary} from '@/types/stats';

const periodLabels = {
    today: 'сегодня',
    week: 'неделя',
    month: 'месяц'
};

export function generateCSV(
    statsSummary: StatsSummary,
    activityData: ActivityData[],
    decisionsData: DecisionsData,
    categoriesData: CategoryData,
    filters: StatsFilters
): string {
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const csvRows = [];

    csvRows.push('Статистика модерации');
    csvRows.push(`Период: ${periodLabels[filters.period as keyof typeof periodLabels] || filters.period}`);
    csvRows.push(`Дата экспорта: ${new Date().toLocaleDateString('ru-RU')}`);
    csvRows.push('');

    csvRows.push('Основные метрики');
    csvRows.push('Показатель,Значение');
    csvRows.push(`Всего проверено,${statsSummary.totalReviewed}`);
    csvRows.push(`Одобрено,${statsSummary.approvedPercentage.toFixed(1)}%`);
    csvRows.push(`Отклонено,${statsSummary.rejectedPercentage.toFixed(1)}%`);
    csvRows.push(`На доработку,${statsSummary.requestChangesPercentage.toFixed(1)}%`);
    csvRows.push(`Среднее время,${formatTime(statsSummary.averageReviewTime)}`);
    csvRows.push('');

    csvRows.push('Активность по дням');
    csvRows.push('Дата,Одобрено,Отклонено,На доработку,Всего');
    activityData.forEach(day => {
        const total = day.approved + day.rejected + day.requestChanges;
        csvRows.push(`${day.date},${day.approved},${day.rejected},${day.requestChanges},${total}`);
    });
    csvRows.push('');

    csvRows.push('Распределение решений');
    csvRows.push('Тип решения,Количество,Процент');
    const totalDecisions = decisionsData.approved + decisionsData.rejected + decisionsData.requestChanges;
    csvRows.push(`Одобрено,${decisionsData.approved},${((decisionsData.approved / totalDecisions) * 100).toFixed(1)}%`);
    csvRows.push(`Отклонено,${decisionsData.rejected},${((decisionsData.rejected / totalDecisions) * 100).toFixed(1)}%`);
    csvRows.push(`На доработку,${decisionsData.requestChanges},${((decisionsData.requestChanges / totalDecisions) * 100).toFixed(1)}%`);
    csvRows.push('');

    csvRows.push('Распределение по категориям');
    csvRows.push('Категория,Количество');
    Object.entries(categoriesData)
        .sort(([, a], [, b]) => b - a)
        .forEach(([category, count]) => {
            csvRows.push(`${category},${count}`);
        });

    return csvRows.join('\n');
}

export function downloadCSV(csvContent: string, filters: StatsFilters) {
    const period = periodLabels[filters.period as keyof typeof periodLabels] || filters.period || 'неделя';
    const date = new Date().toISOString().split('T')[0];
    const filename = `статистика-модерации-${period}-${date}.csv`;

    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}