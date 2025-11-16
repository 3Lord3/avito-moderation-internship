import {Pie, PieChart} from "recharts"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import type {ChartConfig} from "@/components/ui/chart"
import {ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import type {DecisionsData} from '@/types/stats';

interface DecisionsChartProps {
    data: DecisionsData;
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

export function DecisionsChart({data}: DecisionsChartProps) {
    const chartData = [
        {decision: "approved", count: data.approved, fill: "var(--color-chart-1)"},
        {decision: "rejected", count: data.rejected, fill: "var(--color-chart-2)"},
        {decision: "requestChanges", count: data.requestChanges, fill: "var(--color-chart-3)"},
    ];

    return (
        <Card className="h-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>Распределение решений</CardTitle>
                <CardDescription>За выбранный период</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square h-full"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel/>}
                        />
                        <Pie data={chartData} dataKey="count" nameKey="decision"/>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}