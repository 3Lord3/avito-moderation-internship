import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

interface AdsStateProps {
    loading: boolean;
    error: string | null;
    empty: boolean;
    hasActiveFilters: boolean;
    onRetry: () => void;
    onResetFilters: () => void;
}

export function AdsState({loading, error, empty, hasActiveFilters, onRetry, onResetFilters}: AdsStateProps) {
    if (loading) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="text-center">Загрузка объявлений...</div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="text-center text-red-600">
                        <h2 className="text-xl font-semibold mb-2">Ошибка</h2>
                        <p>{error}</p>
                        <Button onClick={onRetry} className="mt-4">
                            Попробовать снова
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (empty) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="text-center text-muted-foreground">
                        <div className="text-4xl mb-4">📭</div>
                        <h3 className="text-lg font-semibold mb-2">Объявления не найдены</h3>
                        <p>Попробуйте изменить параметры фильтрации</p>
                        {hasActiveFilters && (
                            <Button
                                variant="outline"
                                onClick={onResetFilters}
                                className="mt-4"
                            >
                                Сбросить фильтры
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return null;
}