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
    characteristics?: Record<string, string>;
    moderationHistory?: Array<{
        id: number;
        moderatorId: number;
        moderatorName: string;
        action: string;
        reason: string | null;
        comment: string;
        timestamp: string;
    }>;
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

// Цвета для бейджей
export const STATUS_COLORS: Record<AdStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    approved: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
    draft: 'bg-gray-100 text-gray-800 border-gray-200'
};

export const PRIORITY_COLORS: Record<AdPriority, string> = {
    normal: 'bg-blue-100 text-blue-800 border-blue-200',
    urgent: 'bg-orange-100 text-orange-800 border-orange-200'
};