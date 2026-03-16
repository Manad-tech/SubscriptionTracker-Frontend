import { useEffect, useState } from "react";
import { getCategoryStats } from "../services/adminApi.js";
import { getMonthlyRevenue } from "../services/adminApi";
import { getUserGrowth } from "../services/adminApi";
import { CartesianGrid } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { AreaChart, Area, XAxis, YAxis } from "recharts";

interface CategoryStat {
  category: string;
  total: number;
}

const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#14B8A6"];
const monthNames = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Analytics = () => {
  const [data, setData] = useState<CategoryStat[]>([]);
  const [users, setUsers] = useState([]);
  const [revenue, setRevenue] = useState([]);

  const fetchStats = async () => {
    const stats = await getCategoryStats();
    setData(stats);
  };

  const fetchRevenue = async () => {
    try {
      const res = await getMonthlyRevenue();
      console.log("Revenue API:", res);

      const formatted = res.map((item: any) => ({
        month: monthNames[item.month],
        revenue: item.revenue,
      }));

      setRevenue(formatted);
    } catch (err) {
      console.error("Failed to fetch revenue", err);
    }
  };

  const fetchUserGrowth = async () => {
    const res = await getUserGrowth();
    console.log("User Growth API:", res);

    const formatted = res.map((item: any) => ({
      month: monthNames[item._id],
      users: item.total,
    }));

    setUsers(formatted);
  };

  useEffect(() => {
    fetchStats();
    fetchRevenue();
    fetchUserGrowth();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Analytics</h1>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>

          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="total"
                  nameKey="category"
                  outerRadius={100}
                  label
                >
                  {data.map((__, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>

          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenue || []}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#22C55E"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                  animationDuration={800}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>

          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={users || []}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#22C55E"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                  animationDuration={800}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
