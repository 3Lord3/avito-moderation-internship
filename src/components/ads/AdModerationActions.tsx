import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import type {Ad} from '@/types/ads';

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
    if (ad.status !== 'pending') {
        return null;
    }

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        className="bg-green-600 hover:bg-green-700 text-white flex-1"
                        onClick={onApprove}
                        disabled={actionLoading}
                        size="lg"
                    >
                        Одобрить
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
                        className="bg-red-600 hover:bg-red-700 text-white flex-1"
                        onClick={onReject}
                        disabled={actionLoading}
                        size="lg"
                    >
                        Отклонить
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}