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
}