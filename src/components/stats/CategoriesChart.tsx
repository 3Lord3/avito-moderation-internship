import {Bar, BarChart, CartesianGrid, XAxis, YAxis} from "recharts"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import type {ChartConfig} from "@/components/ui/chart"
import {ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import type {CategoryData} from '@/types/stats';

interface CategoriesChartProps {
    data: CategoryData;
}

const chartConfig = {
    count: {
        label: "Количество",
        color: "var(--color-approved)",
    },
} satisfies ChartConfig

export function CategoriesChart({data}: CategoriesChartProps) {
    const chartData = Object.entries(data)
        .map(([category, count]) => ({category, count}))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Распределение по категориям</CardTitle>
                <CardDescription>Проверенные объявления по категориям</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{left: 30}}
                    >
                        <CartesianGrid horizontal={false}/>
                        <XAxis type="number"/>
                        <YAxis
                            dataKey="category"
                            type="category"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            width={80}
                        />
                        <ChartTooltip content={<ChartTooltipContent/>}/>
                        <Bar dataKey="count" fill="var(--color-chart-4)" radius={4}/>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}