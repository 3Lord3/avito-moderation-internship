import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import type {Ad} from '@/types/ads';

interface AdDescriptionProps {
    ad: Ad;
}

export function AdDescription({ad}: AdDescriptionProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Описание</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-line">{ad.description}</p>
            </CardContent>
        </Card>
    );
}