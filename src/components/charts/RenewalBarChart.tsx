import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { CATEGORY_COLORS } from "@/lib/chartColors";

const RenewalBarChart = ({ renewalData = [] }: any) => {
  if (!renewalData.length) {
    return (
      <Card>
        <CardContent className="h-[320px] flex items-center justify-center">
          <p className="text-muted-foreground">No renewal data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Renewals</CardTitle>
        <CardDescription>Subscriptions renewing soon</CardDescription>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={renewalData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />
            <YAxis />

            <Tooltip />

            <Bar dataKey="renewal">
              {(renewalData || []).map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CATEGORY_COLORS[entry.category] || "#6366F1"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RenewalBarChart;
