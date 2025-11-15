export type AdStatus = 'pending' | 'approved' | 'rejected' | 'draft';
export type AdPriority = 'normal' | 'urgent';
export type SortField = 'createdAt' | 'price' | 'priority';
export type SortOrder = 'asc' | 'desc';

export interface Ad {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    categoryId: number;
    status: AdStatus;
    priority: AdPriority;
    createdAt: string;
    updatedAt: string;
    images: string[];
    seller: {
        id: number;
        name: string;
        rating: string;
        totalAds: number;
        registeredAt: string;
    };
}

export interface AdsFilters {
    page?: number;
    limit?: number;
    status?: AdStatus[];
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: SortField;
    sortOrder?: SortOrder;
    priority?: AdPriority
}

export interface AdsResponse {
    ads: Ad[];
    pagination: PaginationInfo;
}

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

export interface FilterOption {
    value: string;
    label: string;
}

// Константы для фильтров
export const STATUS_OPTIONS: FilterOption[] = [
    {value: 'pending', label: 'На модерации'},
    {value: 'approved', label: 'Одобренные'},
    {value: 'rejected', label: 'Отклоненные'},
];

export const PRIORITY_OPTIONS: FilterOption[] = [
    {value: 'normal', label: 'Обычный'},
    {value: 'urgent', label: 'Срочный'},
];

export const SORT_OPTIONS: FilterOption[] = [
    {value: 'createdAt', label: 'По дате создания'},
    {value: 'price', label: 'По цене'},
    {value: 'priority', label: 'По приоритету'},
];

export const CATEGORY_OPTIONS: FilterOption[] = [
    {value: '0', label: 'Электроника'},
    {value: '1', label: 'Недвижимость'},
    {value: '2', label: 'Транспорт'},
    {value: '3', label: 'Работа'},
    {value: '4', label: 'Услуги'},
    {value: '5', label: 'Животные'},
    {value: '6', label: 'Мода'},
    {value: '7', label: 'Детское'},
];

export const ITEMS_PER_PAGE_OPTIONS = [
    {value: '10', label: '10 на странице'},
    {value: '20', label: '20 на странице'},
    {value: '50', label: '50 на странице'},
];