import {Link} from 'react-router-dom';
import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import type {Ad} from '@/types/ads';

interface AdCardProps {
    ad: Ad;
}

export function AdCard({ad}: AdCardProps) {
    const statusConfig = {
        pending: {label: 'На модерации', variant: 'secondary' as const},
        approved: {label: 'Одобрено', variant: 'default' as const},
        rejected: {label: 'Отклонено', variant: 'destructive' as const},
        draft: {label: 'Черновик', variant: 'outline' as const},
    };

    const priorityConfig = {
        normal: {label: 'Обычное', variant: 'outline' as const},
        urgent: {label: 'Срочное', variant: 'destructive' as const},
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
    };

    const status = statusConfig[ad.status];
    const priority = priorityConfig[ad.priority];

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
                <div className="flex gap-4 items-start">
                    {/* Фото */}
                    <div className="shrink-0">
                        <div className="bg-muted rounded-lg w-32 h-32 flex items-center justify-center">
                            <div className="text-muted-foreground text-center">
                                <div className="text-2xl mb-1">📷</div>
                                <div className="text-xs">Фото товара</div>
                                {ad.images?.length > 0 && (
                                    <div className="text-xs mt-1 text-muted-foreground/70">
                                        {ad.images.length} фото
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Информация о товаре */}
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg line-clamp-2 mr-2">
                                {ad.title}
                            </h3>
                            <div className="flex gap-1 shrink-0">
                                <Badge variant={status.variant} className="text-xs">
                                    {status.label}
                                </Badge>
                                <Badge variant={priority.variant} className="text-xs">
                                    {priority.label}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xl font-bold text-green-600">
                                {formatPrice(ad.price)}
                            </span>
                            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                            {ad.category}
                          </span>
                        </div>

                        <div className="text-xs text-muted-foreground">
                            Создано: {formatDate(ad.createdAt)}
                        </div>
                    </div>
                </div>

                {/* Кнопка */}
                <div className="shrink-0 flex justify-end">
                    <Button asChild>
                        <Link to={`/item/${ad.id}`}>
                            Открыть
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}