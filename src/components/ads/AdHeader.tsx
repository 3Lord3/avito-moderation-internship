import {Button} from '@/components/ui/button';
import {Kbd} from '@/components/ui/kbd';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

interface AdPageHeaderProps {
    currentIndex: number;
    totalAds: number;
    prevAd: any | null;
    nextAd: any | null;
    onNavigateToAd: (adId: number) => void;
}

export function AdHeader({currentIndex, totalAds, prevAd, nextAd, onNavigateToAd}: AdPageHeaderProps) {
    const navigate = useNavigate();

    // Обработчик горячих клавиш для навигации
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Игнорируем если фокус в input или textarea
            if (
                event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement
            ) {
                return;
            }

            switch (event.key.toLowerCase()) {
                case 'arrowleft':
                    event.preventDefault();
                    if (prevAd) {
                        onNavigateToAd(prevAd.id);
                    }
                    break;
                case 'arrowright':
                    event.preventDefault();
                    if (nextAd) {
                        onNavigateToAd(nextAd.id);
                    }
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [prevAd, nextAd, onNavigateToAd]);

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
                        className="flex items-center gap-2"
                    >
                        <Kbd>←</Kbd>
                        Предыдущее
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => nextAd && onNavigateToAd(nextAd.id)}
                        disabled={!nextAd}
                        className="flex items-center gap-2"
                    >
                        Следующее
                        <Kbd>→</Kbd>
                    </Button>
                </div>
            </div>
        </div>
    );
}