import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import type {Ad} from '@/types/ads';
import {PRIORITY_COLORS, STATUS_COLORS} from '@/types/ads';

interface AdInfoProps {
    ad: Ad;
}

export function AdInfo({ad}: AdInfoProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Продавец</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div>
                        <p className="font-semibold">{ad.seller.name}</p>
                        <p className="text-sm text-gray-600">Рейтинг: {ad.seller.rating} ★</p>
                    </div>
                    <div className="text-sm">
                        <p>Объявлений: {ad.seller.totalAds}</p>
                        <p>Зарегистрирован: {new Date(ad.seller.registeredAt).toLocaleDateString()}</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between">
                        <span>Цена:</span>
                        <span className="font-semibold">{ad.price.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Категория:</span>
                        <span>{ad.category}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Статус:</span>
                        <Badge className={STATUS_COLORS[ad.status]}>
                            {ad.status === 'pending' ? 'На модерации' :
                                ad.status === 'approved' ? 'Одобрено' : 'Отклонено'}
                        </Badge>
                    </div>
                    <div className="flex justify-between">
                        <span>Приоритет:</span>
                        <Badge className={PRIORITY_COLORS[ad.priority]}>
                            {ad.priority === 'normal' ? 'Обычный' : 'Срочный'}
                        </Badge>
                    </div>
                    <div className="flex justify-between">
                        <span>Создано:</span>
                        <span className="text-sm">{new Date(ad.createdAt).toLocaleString()}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}