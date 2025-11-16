import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import type {Ad} from '@/types/ads';

interface AdModerationHistoryProps {
    ad: Ad;
}

export function AdModerationHistory({ad}: AdModerationHistoryProps) {
    return (
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
                                        <p className="text-sm">
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
                                    <p className="mt-1 text-sm">
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
    );
}