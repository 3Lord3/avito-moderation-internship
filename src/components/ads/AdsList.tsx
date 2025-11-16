import {AdCard} from '@/components/ads/AdCard';
import type {Ad} from '@/types/ads';

interface AdsListProps {
    ads: Ad[];
}

export function AdsList({ads}: AdsListProps) {
    return (
        <div className="space-y-4 mb-6">
            {ads.map((ad) => (
                <AdCard key={ad.id} ad={ad}/>
            ))}
        </div>
    );
}