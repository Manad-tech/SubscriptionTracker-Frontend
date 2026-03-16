import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import axios from "axios";
import { useEffect, useState } from "react";

const monthNames = [
  "",
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

const SpendingTrendChart = () => {

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/subscriptions/stats/category-trend",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const trends = res.data || [];
        
        const grouped = Object.values(
          trends.reduce((acc: any, item: any) => {

            const monthKey = item.month;

            if (!acc[monthKey]) {
              acc[monthKey] = {
                month: monthNames[monthKey],
              };
            }

            acc[monthKey][item.category] = item.total;

            return acc;

          }, {})
        );

        console.log("Formatted chart data:", grouped);

        setData(grouped);

      } catch (error) {
        console.error("Failed to fetch trend data:", error);
      }
    };

    fetchData();

  }, []);

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent className="h-[320px] flex items-center justify-center">
          <p className="text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Trend</CardTitle>
        <CardDescription>
          Monthly subscription spending
        </CardDescription>
      </CardHeader>

      <CardContent className="h-[320px]">

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>

            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

            <XAxis
              dataKey="month"
              interval={0}
              angle={-25}
              textAnchor="end"
              tickLine={false}
              axisLine={false}
            />

            <YAxis tickLine={false} axisLine={false} />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="Shopping"
              stroke="#6366F1"
              fill="#6366F1"
              stackId="1"
            />

            <Area
              type="monotone"
              dataKey="Entertainment"
              stroke="#22c55e"
              fill="#22c55e"
              stackId="1"
            />

            <Area
              type="monotone"
              dataKey="Productivity"
              stroke="#f59e0b"
              fill="#f59e0b"
              stackId="1"
            />

            <Area
              type="monotone"
              dataKey="Music"
              stroke="#ec4899"
              fill="#ec4899"
              stackId="1"
            />

            <Area
              type="monotone"
              dataKey="AI Tools"
              stroke="#06b6d4"
              fill="#06b6d4"
              stackId="1"
            />

          </AreaChart>
        </ResponsiveContainer>

      </CardContent>
    </Card>
  );
};

export default SpendingTrendChart;
