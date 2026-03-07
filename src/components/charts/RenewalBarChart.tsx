import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const RenewalBarChart = ({ data }: any) => {
  return (
    <Card>

      <CardHeader>
        <CardTitle>Upcoming Renewals</CardTitle>
        <CardDescription>Subscriptions renewing soon</CardDescription>
      </CardHeader>

      <CardContent className="h-[300px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />
            <YAxis />

            <Tooltip />

            <Bar dataKey="renewal" fill="#6366F1" />

          </BarChart>

        </ResponsiveContainer>

      </CardContent>

    </Card>
  );
};

export default RenewalBarChart;