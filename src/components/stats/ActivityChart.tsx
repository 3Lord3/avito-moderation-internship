import {Bar, BarChart, CartesianGrid, XAxis, YAxis} from "recharts"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import type {ChartConfig} from "@/components/ui/chart"
import {ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import type {ActivityData} from '@/types/stats';

interface ActivityChartProps {
    data: ActivityData[];
}

const chartConfig = {
    approved: {
        label: "Одобрено",
        color: "var(--color-approved)",
    },
    rejected: {
        label: "Отклонено",
        color: "var(--color-rejected)",
    },
    requestChanges: {
        label: "На доработку",
        color: "var(--color-changes)",
    },
} satisfies ChartConfig

export function ActivityChart({data}: ActivityChartProps) {
    const chartData = data.map(item => ({
        date: new Date(item.date).toLocaleDateString('ru-RU', {day: 'numeric', month: 'short'}),
        approved: item.approved,
        rejected: item.rejected,
        requestChanges: item.requestChanges,
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Активность модерации</CardTitle>
                <CardDescription>Количество решений по дням</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                        />
                        <ChartTooltip content={<ChartTooltipContent/>}/>
                        <Bar dataKey="approved" fill="var(--color-chart-1)" radius={4}/>
                        <Bar dataKey="rejected" fill="var(--color-chart-2)" radius={4}/>
                        <Bar dataKey="requestChanges" fill="var(--color-chart-3)" radius={4}/>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}