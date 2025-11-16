interface AdsHeaderProps {
    adsCount: number;
    totalItems: number;
}

export function AdsHeader({adsCount, totalItems}: AdsHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Список объявлений</h1>
            <div className="text-sm text-muted-foreground">
                Показано {adsCount} из {totalItems} объявлений
            </div>
        </div>
    );
}