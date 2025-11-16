import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Kbd} from '@/components/ui/kbd';

const REJECTION_REASONS = [
    'Запрещенный товар',
    'Неверная категория',
    'Некорректное описание',
    'Проблемы с фото',
    'Подозрение на мошенничество',
    'Другое'
];

interface RejectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onReject: (reason: string) => void;
    actionLoading: boolean;
}

export function RejectDialog({open, onOpenChange, onReject, actionLoading}: RejectDialogProps) {
    const [rejectionReason, setRejectionReason] = useState('');
    const [customReason, setCustomReason] = useState('');

    // Обработчик горячей клавиши Enter
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && open) {
                event.preventDefault();
                const canSubmit = rejectionReason &&
                    (rejectionReason !== 'Другое' || customReason) &&
                    !actionLoading;

                if (canSubmit) {
                    handleReject();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, rejectionReason, customReason, actionLoading]);

    const handleReject = () => {
        const finalReason = rejectionReason === 'Другое' ? customReason : rejectionReason;
        onReject(finalReason);
    };

    const handleClose = () => {
        onOpenChange(false);
        setRejectionReason('');
        setCustomReason('');
    };

    const canSubmit = rejectionReason &&
        (rejectionReason !== 'Другое' || customReason) &&
        !actionLoading;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Отклонить объявление</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Label>Причина отклонения</Label>
                    <RadioGroup value={rejectionReason} onValueChange={setRejectionReason}>
                        {REJECTION_REASONS.map((reason) => (
                            <div key={reason} className="flex items-center space-x-2">
                                <RadioGroupItem value={reason} id={reason}/>
                                <Label htmlFor={reason}>{reason}</Label>
                            </div>
                        ))}
                    </RadioGroup>

                    {rejectionReason === 'Другое' && (
                        <div className="space-y-2">
                            <Label htmlFor="custom-reason">Укажите причину</Label>
                            <Textarea
                                id="custom-reason"
                                value={customReason}
                                onChange={(e) => setCustomReason(e.target.value)}
                                placeholder="Введите причину отклонения..."
                            />
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button
                        onClick={handleReject}
                        disabled={!canSubmit}
                        className="flex items-center gap-2"
                    >
                        Отклонить
                        <Kbd className="text-xs">Enter</Kbd>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}