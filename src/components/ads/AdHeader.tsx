import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';

interface AdPageHeaderProps {
    currentIndex: number;
    totalAds: number;
    prevAd: any | null;
    nextAd: any | null;
    onNavigateToAd: (adId: number) => void;
}

export function AdHeader({currentIndex, totalAds, prevAd, nextAd, onNavigateToAd}: AdPageHeaderProps) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigate('/list')}>
                    ← Назад к списку
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground">
                    {totalAds > 0 ? `${currentIndex + 1} из ${totalAds}` : ''}
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => prevAd && onNavigateToAd(prevAd.id)}
                        disabled={!prevAd}
                    >
                        ← Предыдущее
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => nextAd && onNavigateToAd(nextAd.id)}
                        disabled={!nextAd}
                    >
                        Следующее →
                    </Button>
                </div>
            </div>
        </div>
    );
}