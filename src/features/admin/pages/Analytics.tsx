import { useEffect, useState } from "react";
import { getCategoryStats } from "../services/adminApi.js";
import { getMonthlyRevenue } from "../services/adminApi";
import { getUserGrowth } from "../services/adminApi";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { LineChart, Line, XAxis, YAxis } from "recharts";

interface CategoryStat {
  category: string;
  total: number;
}

const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#14B8A6"];

const Analytics = () => {
  const [data, setData] = useState<CategoryStat[]>([]);
  const [users, setUsers] = useState([]);
  const [revenue, setRevenue] = useState([]);

  const fetchStats = async () => {
    const stats = await getCategoryStats();
    setData(stats);
  };

  const fetchRevenue = async () => {
    const data = await getMonthlyRevenue();
    setRevenue(data);
  };

  const fetchUserGrowth = async () => {
    const res = await getUserGrowth();
    setUsers(res);
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
        {/* Category Chart */}

        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>

          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="total"
                  nameKey="category"
                  outerRadius={100}
                  label
                >
                  {data.map((entry, index) => (
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
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenue}>
                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366F1"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>

          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={users}>
                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#22C55E"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
