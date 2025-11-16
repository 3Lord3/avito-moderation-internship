import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import {useGetAdByIdQuery, useGetAdsQuery} from '@/services/api/adsApi';
import {clearError, setCurrentAd} from '@/store/ads/adsSlice';
import {AdGallery} from '@/components/ads/AdGallery';
import {AdInfo} from '@/components/ads/AdInfo';
import {AdDescription} from '@/components/ads/AdDescription';
import {AdCharacteristics} from '@/components/ads/AdCharacteristics';
import {AdModerationHistory} from '@/components/ads/AdModerationHistory';
import {AdModerationActions} from '@/components/ads/AdModerationActions';
import {RejectDialog} from '@/components/ads/RejectDialog';
import {useAdNavigation} from '@/hooks/ads/useAdNavigation';
import {useAdModeration} from '@/hooks/ads/useAdModeration';
import {AdHeader} from "@/components/ads/AdHeader";

export default function Item() {
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const {currentAd: ad, actionLoading} = useAppSelector((state) => state.ads);

    const {data: adsData} = useGetAdsQuery({limit: 1000});
    const allAds = adsData?.ads || [];

    const {
        data: adData,
        isLoading: loading,
        error: queryError
    } = useGetAdByIdQuery(Number(id), {
        skip: !id,
    });

    const {navigateToAd, getCurrentAdIndex, getNextAd, getPrevAd} = useAdNavigation();
    const {approveAd, rejectAd, requestChanges} = useAdModeration();

    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

    useEffect(() => {
        if (adData) {
            dispatch(setCurrentAd(adData));
        }

        return () => {
            dispatch(setCurrentAd(null));
            dispatch(clearError());
        };
    }, [adData, dispatch]);

    const handleApprove = async () => {
        if (!ad) return;
        await approveAd(ad.id);
    };

    const handleReject = async (reason: string) => {
        if (!ad) return;
        await rejectAd(ad.id, reason);
        setRejectDialogOpen(false);
    };

    const handleRequestChanges = async () => {
        if (!ad) return;
        await requestChanges(ad.id);
    };

    const error = queryError ? 'Ошибка при загрузке объявления' : null;

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
                            <Button onClick={() => navigateToAd(allAds[0]?.id || 0)} className="mt-4">
                                Назад к списку
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const currentIndex = getCurrentAdIndex(allAds, ad.id);
    const prevAd = getPrevAd(allAds, ad.id);
    const nextAd = getNextAd(allAds, ad.id);

    return (
        <div className="container mx-auto">
            <AdHeader
                currentIndex={currentIndex}
                totalAds={allAds.length}
                prevAd={prevAd}
                nextAd={nextAd}
                onNavigateToAd={navigateToAd}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <AdGallery ad={ad}/>
                    <AdInfo ad={ad}/>
                    <AdDescription ad={ad}/>
                    <AdCharacteristics ad={ad}/>
                    <AdModerationActions
                        ad={ad}
                        actionLoading={actionLoading}
                        onApprove={handleApprove}
                        onRequestChanges={handleRequestChanges}
                        onReject={() => setRejectDialogOpen(true)}
                    />
                </div>

                <div>
                    <AdModerationHistory ad={ad}/>
                </div>
            </div>

            <RejectDialog
                open={rejectDialogOpen}
                onOpenChange={setRejectDialogOpen}
                onReject={handleReject}
                actionLoading={actionLoading}
            />
        </div>
    );
}