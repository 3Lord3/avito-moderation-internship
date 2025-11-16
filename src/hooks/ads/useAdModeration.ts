import {useCallback} from 'react';
import {useAppDispatch} from '@/hooks/redux';
import {useApproveAdMutation, useRejectAdMutation, useRequestChangesMutation} from '@/services/api/adsApi';
import {setActionLoading} from '@/store/ads/adsSlice';

export function useAdModeration() {
    const dispatch = useAppDispatch();
    const [approveAdMutation] = useApproveAdMutation();
    const [rejectAdMutation] = useRejectAdMutation();
    const [requestChangesMutation] = useRequestChangesMutation();

    const approveAd = useCallback(async (adId: number) => {
        try {
            dispatch(setActionLoading(true));
            await approveAdMutation(adId).unwrap();
        } catch (err) {
            console.error('Error approving ad:', err);
            throw err;
        } finally {
            dispatch(setActionLoading(false));
        }
    }, [dispatch, approveAdMutation]);

    const rejectAd = useCallback(async (adId: number, reason: string) => {
        try {
            dispatch(setActionLoading(true));
            await rejectAdMutation({
                id: adId,
                data: {reason}
            }).unwrap();
        } catch (err) {
            console.error('Error rejecting ad:', err);
            throw err;
        } finally {
            dispatch(setActionLoading(false));
        }
    }, [dispatch, rejectAdMutation]);

    const requestChanges = useCallback(async (adId: number) => {
        try {
            dispatch(setActionLoading(true));
            await requestChangesMutation({
                id: adId,
                data: {reason: 'Требуются изменения'}
            }).unwrap();
        } catch (err) {
            console.error('Error requesting changes:', err);
            throw err;
        } finally {
            dispatch(setActionLoading(false));
        }
    }, [dispatch, requestChangesMutation]);

    return {
        approveAd,
        rejectAd,
        requestChanges,
    };
}