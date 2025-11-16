import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {ToggleGroup, ToggleGroupItem} from '@/components/ui/toggle-group';
import {Label} from '@/components/ui/label';
import {Kbd} from '@/components/ui/kbd';
import {useEffect, useRef} from 'react';
import type {AdPriority, AdsFilters, AdStatus, SortField} from '@/types/ads';
import {CATEGORY_OPTIONS, ITEMS_PER_PAGE_OPTIONS, PRIORITY_OPTIONS, SORT_OPTIONS, STATUS_OPTIONS} from '@/types/ads';

interface AdsFiltersProps {
    filters: AdsFilters;
    onFiltersChange: (filters: Partial<AdsFilters>) => void;
    onApplyFilters: () => void;
    onResetFilters: () => void;
}

export function AdsFilters({filters, onFiltersChange, onApplyFilters, onResetFilters}: AdsFiltersProps) {
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Обработчик горячих клавиш
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Фокус на поиск при нажатии /
            if (event.key === '/' && !(event.target instanceof HTMLInputElement)) {
                event.preventDefault();
                searchInputRef.current?.focus();
            }

            // Применить фильтры при нажатии Enter (когда не в поле ввода)
            if (event.key === 'Enter' && !(event.target instanceof HTMLInputElement)) {
                event.preventDefault();
                onApplyFilters();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onApplyFilters]);

    const handleFilterChange = (key: keyof AdsFilters, value: any) => {
        onFiltersChange({
            ...filters,
            [key]: value,
            page: 1
        });
    };

    const handleStatusChange = (values: string[]) => {
        onFiltersChange({
            ...filters,
            status: values as AdStatus[],
            page: 1
        });
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

    const getSafePriorityValue = () => {
        return filters.priority || 'all';
    };

    const getSafeCategoryValue = () => {
        return filters.categoryId?.toString() || 'all';
    };

    const getSafeSortValue = () => {
        return filters.sortBy || 'createdAt';
    };

    const getSafeLimitValue = () => {
        return filters.limit?.toString() || '10';
    };

    return (
        <div className="space-y-6 p-6 border rounded-lg bg-muted/20 mb-4">
            {/* Основные фильтры */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Поиск */}
                <div className="space-y-2">
                    <Label htmlFor="search">Поиск</Label>
                    <div className="relative">
                        <Input
                            ref={searchInputRef}
                            id="search"
                            placeholder="Название или описание..."
                            value={filters.search || ''}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="pr-16" // Добавляем отступ справа для Kbd
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <Kbd className="text-xs">/</Kbd>
                        </div>
                    </div>
                </div>

                {/* Приоритет */}
                <div className="space-y-2">
                    <Label>Приоритет</Label>
                    <Select
                        value={getSafePriorityValue()}
                        onValueChange={(value) => {
                            const priorityValue = value !== 'all' ? value as AdPriority : undefined;
                            handleFilterChange('priority', priorityValue);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Все приоритеты"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Все приоритеты</SelectItem>
                            {PRIORITY_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Категория */}
                <div className="space-y-2">
                    <Label>Категория</Label>
                    <Select
                        value={getSafeCategoryValue()}
                        onValueChange={(value) => {
                            const categoryId = value !== 'all' ? parseInt(value) : undefined;
                            handleFilterChange('categoryId', categoryId);
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Все категории"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Все категории</SelectItem>
                            {CATEGORY_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Статус */}
            <div className="space-y-2">
                <Label>Статус</Label>
                <ToggleGroup
                    type="multiple"
                    value={filters.status || []}
                    onValueChange={handleStatusChange}
                    className="flex flex-wrap"
                >
                    {STATUS_OPTIONS.map((option) => (
                        <ToggleGroupItem
                            key={option.value}
                            value={option.value}
                            variant="outline"
                            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-md"
                        >
                            {option.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>

            {/* Дополнительные фильтры */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Цена от */}
                <div className="space-y-2">
                    <Label htmlFor="minPrice">Цена от</Label>
                    <Input
                        id="minPrice"
                        type="number"
                        placeholder="0"
                        value={filters.minPrice || ''}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                    />
                </div>

                {/* Цена до */}
                <div className="space-y-2">
                    <Label htmlFor="maxPrice">Цена до</Label>
                    <Input
                        id="maxPrice"
                        type="number"
                        placeholder="100000"
                        value={filters.maxPrice || ''}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                    />
                </div>

                {/* Сортировка */}
                <div className="space-y-2">
                    <Label>Сортировка</Label>
                    <div className="flex gap-2">
                        <Select
                            value={getSafeSortValue()}
                            onValueChange={(value) => handleFilterChange('sortBy', value as SortField)}
                        >
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                {SORT_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
                        >
                            {filters.sortOrder === 'asc' ? '↑' : '↓'}
                        </Button>
                    </div>
                </div>

                {/* Элементов на странице */}
                <div className="space-y-2">
                    <Label>На странице</Label>
                    <Select
                        value={getSafeLimitValue()}
                        onValueChange={(value) => handleFilterChange('limit', parseInt(value))}
                    >
                        <SelectTrigger>
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                    {hasActiveFilters() ? 'Настроены фильтры' : 'Все фильтры сброшены'}
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={onApplyFilters}
                        className="flex items-center gap-2"
                    >
                        Применить фильтры
                        <Kbd className="text-xs">Enter</Kbd>
                    </Button>
                    {hasActiveFilters() && (
                        <Button variant="outline" onClick={onResetFilters}>
                            Сбросить все
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}