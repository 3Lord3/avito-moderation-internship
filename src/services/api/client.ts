export const API_BASE = '/api/v1';

class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

async function apiFetch<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`);

    if (!response.ok) {
        throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export const apiClient = {
    get: <T>(endpoint: string) => apiFetch<T>(endpoint),
};