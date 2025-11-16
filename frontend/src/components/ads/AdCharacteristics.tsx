import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import type {Ad} from '@/types/ads';

interface AdCharacteristicsProps {
    ad: Ad;
}

export function AdCharacteristics({ad}: AdCharacteristicsProps) {
    if (!ad.characteristics || Object.keys(ad.characteristics).length === 0) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Характеристики</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/3">Характеристика</TableHead>
                            <TableHead>Значение</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.entries(ad.characteristics).map(([key, value]) => (
                            <TableRow key={key}>
                                <TableCell className="font-medium">{key}</TableCell>
                                <TableCell>{value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}