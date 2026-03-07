import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from "@/components/ui/card";

const SpendingTrendChart = ({ data }: any) => {
  return (
    <Card>

      <CardHeader>
        <CardTitle>Spending Trend</CardTitle>
        <CardDescription>
          Monthly subscription spending
        </CardDescription>
      </CardHeader>

      <CardContent className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="colorAmount"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#6366F1"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#6366F1"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#6366F1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorAmount)"
              animationDuration={800}
            />

          </AreaChart>

        </ResponsiveContainer>

      </CardContent>

    </Card>
  );
};

export default SpendingTrendChart;