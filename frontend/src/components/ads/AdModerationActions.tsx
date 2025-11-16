import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Kbd} from '@/components/ui/kbd';
import type {Ad} from '@/types/ads';
import {useEffect} from 'react';

interface AdModerationActionsProps {
    ad: Ad;
    actionLoading: boolean;
    onApprove: () => void;
    onRequestChanges: () => void;
    onReject: () => void;
}

export function AdModerationActions({
                                        ad,
                                        actionLoading,
                                        onApprove,
                                        onRequestChanges,
                                        onReject
                                    }: AdModerationActionsProps) {
    // Обработчик горячих клавиш
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement ||
                actionLoading
            ) {
                return;
            }

            switch (event.key.toLowerCase()) {
                case 'a':
                    event.preventDefault();
                    onApprove();
                    break;
                case 'd':
                    event.preventDefault();
                    onReject();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onApprove, onReject, actionLoading]);

    if (ad.status !== 'pending') {
        return null;
    }

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        className="bg-green-600 hover:bg-green-700 text-white flex-1 flex items-center justify-center gap-2"
                        onClick={onApprove}
                        disabled={actionLoading}
                        size="lg"
                    >
                        Одобрить
                        <Kbd className="text-xs bg-white/20 border-white/30 text-white">A</Kbd>
                    </Button>
                    <Button
                        className="bg-yellow-600 hover:bg-yellow-700 text-white flex-1"
                        onClick={onRequestChanges}
                        disabled={actionLoading}
                        size="lg"
                    >
                        Вернуть на доработку
                    </Button>
                    <Button
                        className="bg-red-600 hover:bg-red-700 text-white flex-1 flex items-center justify-center gap-2"
                        onClick={onReject}
                        disabled={actionLoading}
                        size="lg"
                    >
                        Отклонить
                        <Kbd className="text-xs bg-white/20 border-white/30 text-white">D</Kbd>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}