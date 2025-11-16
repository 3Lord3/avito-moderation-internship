import {Button} from '@/components/ui/button';
import {Sheet} from 'lucide-react';
import {downloadCSV, generateCSV} from '@/utils/exportUtils';
import type {ActivityData, CategoryData, DecisionsData, StatsFilters, StatsSummary} from '@/types/stats';

interface ExportButtonsProps {
    filters: StatsFilters;
    statsSummary?: StatsSummary;
    activityData?: ActivityData[];
    decisionsData?: DecisionsData;
    categoriesData?: CategoryData;
}

export function ExportButtons({
                                  filters,
                                  statsSummary,
                                  activityData,
                                  decisionsData,
                                  categoriesData
                              }: ExportButtonsProps) {
    const handleExportCSV = () => {
        if (!statsSummary || !activityData || !decisionsData || !categoriesData) {
            alert('Нет данных для экспорта');
            return;
        }

        const csvContent = generateCSV(statsSummary, activityData, decisionsData, categoriesData, filters);
        downloadCSV(csvContent, filters);
    };

    const canExport = statsSummary && activityData && decisionsData && categoriesData;

    return (
        <div className="flex gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                disabled={!canExport}
                className="flex items-center gap-2"
            >
                <Sheet className="h-4 w-4"/>
                Загрузить как CSV
            </Button>
        </div>
    );
}