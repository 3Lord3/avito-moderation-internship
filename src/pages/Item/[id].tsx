import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from '@/components/ui/carousel';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table';
import {adsApi} from '@/services/api/ads';
import type {Ad} from '@/types/ads';
import {PRIORITY_COLORS, STATUS_COLORS} from '@/types/ads';

const REJECTION_REASONS = [
    'Запрещенный товар',
    'Неверная категория',
    'Некорректное описание',
    'Проблемы с фото',
    'Подозрение на мошенничество',
    'Другое'
];

export default function Item() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [ad, setAd] = useState<Ad | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [customReason, setCustomReason] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const loadAd = async () => {
            await fetchAd();
        };
        loadAd();
    }, [id]);

    const fetchAd = async () => {
        try {
            setLoading(true);
            setError(null);
            const adData = await adsApi.getAdById(Number(id));
            setAd(adData);
        } catch (err) {
            const response = await adsApi.getAds({limit: 1000});
            const foundAd = response.ads.find(a => a.id === Number(id));
            if (foundAd) {
                setAd(foundAd);
            } else {
                setError('Объявление не найдено');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async () => {
        if (!ad) return;

        try {
            setActionLoading(true);
            await adsApi.approveAd(ad.id);
            await fetchAd();
        } catch (err) {
            console.error('Error approving ad:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = async () => {
        if (!ad) return;

        try {
            setActionLoading(true);
            const finalReason = rejectionReason === 'Другое' ? customReason : rejectionReason;
            await adsApi.rejectAd(ad.id, {reason: finalReason});
            setRejectDialogOpen(false);
            setRejectionReason('');
            setCustomReason('');
            await fetchAd();
        } catch (err) {
            console.error('Error rejecting ad:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleRequestChanges = async () => {
        if (!ad) return;

        try {
            setActionLoading(true);
            await adsApi.requestChanges(ad.id, {reason: 'Требуются изменения'});
            await fetchAd();
        } catch (err) {
            console.error('Error requesting changes:', err);
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto">
                <div className="text-center">Загрузка объявления...</div>
            </div>
        );
    }

    if (error || !ad) {
        return (
            <div className="container mx-auto">
                <Card>
                    <CardContent className="p-6">
                        <div className="text-center text-red-600">
                            <h2 className="text-xl font-semibold mb-2">Ошибка</h2>
                            <p>{error || 'Объявление не найдено'}</p>
                            <Button onClick={() => navigate('/')} className="mt-4">
                                Назад к списку
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <Button variant="outline" onClick={() => navigate('/')}>
                    ← Назад к списку
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                <span>Изображений: {ad.images.length}</span>
                                <div className="flex gap-2">
                                    <Badge className={STATUS_COLORS[ad.status]}>
                                        {ad.status === 'pending' ? 'На модерации' :
                                            ad.status === 'approved' ? 'Одобрено' : 'Отклонено'}
                                    </Badge>
                                    <Badge className={PRIORITY_COLORS[ad.priority]}>
                                        {ad.priority === 'normal' ? 'Обычный' : 'Срочный'}
                                    </Badge>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative">
                                <Carousel className="w-full">
                                    <CarouselContent>
                                        {ad.images.map((image, index) => (
                                            <CarouselItem key={index}>
                                                <div className="p-1">
                                                    <img
                                                        src={image}
                                                        alt={`Изображение ${index + 1}`}
                                                        className="w-full h-96 object-cover rounded-lg"
                                                        onError={(e) => {
                                                            e.currentTarget.src = "";
                                                            e.currentTarget.className = "w-full h-96 bg-gray-200 rounded-lg";
                                                        }}
                                                    />
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2"/>
                                    <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2"/>
                                </Carousel>
                            </div>
                        </CardContent>
                    </Card>

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

                    <Card>
                        <CardHeader>
                            <CardTitle>Описание</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 whitespace-pre-line">{ad.description}</p>
                        </CardContent>
                    </Card>

                    {ad.characteristics && Object.keys(ad.characteristics).length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Характеристики</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-1/3">Характеристика</TableHead>
                                            <TableHead>Значение</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.entries(ad.characteristics).map(([key, value]) => (
                                            <TableRow key={key}>
                                                <TableCell className="font-medium">{key}</TableCell>
                                                <TableCell>{value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    )}

                    {ad.status === 'pending' && (
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button
                                        className="bg-green-600 hover:bg-green-700 text-white flex-1"
                                        onClick={handleApprove}
                                        disabled={actionLoading}
                                        size="lg"
                                    >
                                        Одобрить
                                    </Button>
                                    <Button
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white flex-1"
                                        onClick={handleRequestChanges}
                                        disabled={actionLoading}
                                        size="lg"
                                    >
                                        Вернуть на доработку
                                    </Button>
                                    <Button
                                        className="bg-red-600 hover:bg-red-700 text-white flex-1"
                                        onClick={() => setRejectDialogOpen(true)}
                                        disabled={actionLoading}
                                        size="lg"
                                    >
                                        Отклонить
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div>
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>История модерации</CardTitle>
                        </CardHeader>
                        <CardContent className="h-full overflow-y-auto">
                            {ad.moderationHistory && ad.moderationHistory.length > 0 ? (
                                <div className="space-y-4">
                                    {ad.moderationHistory.map((history) => (
                                        <div key={history.id} className="border-l-4 border-blue-500 pl-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold">{history.moderatorName}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {new Date(history.timestamp).toLocaleString()}
                                                    </p>
                                                </div>
                                                <Badge variant={
                                                    history.action === 'approved' ? 'default' :
                                                        history.action === 'rejected' ? 'destructive' : 'secondary'
                                                }>
                                                    {history.action === 'approved' ? 'Одобрено' :
                                                        history.action === 'rejected' ? 'Отклонено' : 'На доработке'}
                                                </Badge>
                                            </div>
                                            {history.reason && (
                                                <p className="mt-2 text-sm">
                                                    <strong>Причина:</strong> {history.reason}
                                                </p>
                                            )}
                                            {history.comment && (
                                                <p className="mt-1 text-sm text-gray-600">
                                                    <strong>Комментарий:</strong> {history.comment}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">История модерации отсутствует</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Отклонить объявление</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Label>Причина отклонения</Label>
                        <RadioGroup value={rejectionReason} onValueChange={setRejectionReason}>
                            {REJECTION_REASONS.map((reason) => (
                                <div key={reason} className="flex items-center space-x-2">
                                    <RadioGroupItem value={reason} id={reason}/>
                                    <Label htmlFor={reason}>{reason}</Label>
                                </div>
                            ))}
                        </RadioGroup>

                        {rejectionReason === 'Другое' && (
                            <div className="space-y-2">
                                <Label htmlFor="custom-reason">Укажите причину</Label>
                                <Textarea
                                    id="custom-reason"
                                    value={customReason}
                                    onChange={(e) => setCustomReason(e.target.value)}
                                    placeholder="Введите причину отклонения..."
                                />
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
                            Отмена
                        </Button>
                        <Button
                            onClick={handleReject}
                            disabled={!rejectionReason || (rejectionReason === 'Другое' && !customReason) || actionLoading}
                        >
                            Отклонить
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}