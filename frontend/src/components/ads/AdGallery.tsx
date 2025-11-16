import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from '@/components/ui/carousel';
import type {Ad} from '@/types/ads';
import {PRIORITY_COLORS, STATUS_COLORS} from '@/types/ads';

interface AdGalleryProps {
    ad: Ad;
}

export function AdGallery({ad}: AdGalleryProps) {
    return (
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
    );
}