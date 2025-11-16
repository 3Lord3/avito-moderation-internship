import {useNavigate} from 'react-router-dom';
import type {Ad} from '@/types/ads';

export function useAdNavigation() {
    const navigate = useNavigate();

    const navigateToAd = (adId: number) => {
        navigate(`/item/${adId}`);
    };

    const getCurrentAdIndex = (allAds: Ad[], currentAdId: number) => {
        return allAds.findIndex(a => a.id === currentAdId);
    };

    const getNextAd = (allAds: Ad[], currentAdId: number) => {
        const currentIndex = getCurrentAdIndex(allAds, currentAdId);
        if (currentIndex < allAds.length - 1) {
            return allAds[currentIndex + 1];
        }
        return null;
    };

    const getPrevAd = (allAds: Ad[], currentAdId: number) => {
        const currentIndex = getCurrentAdIndex(allAds, currentAdId);
        if (currentIndex > 0) {
            return allAds[currentIndex - 1];
        }
        return null;
    };

    return {
        navigateToAd,
        getCurrentAdIndex,
        getNextAd,
        getPrevAd,
    };
}