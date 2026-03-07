import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

const CategoryPieChart = ({ data }: any) => {
  return (
    <Card>

      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>Where your money goes</CardDescription>
      </CardHeader>

      <CardContent className="h-[300px]">

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {data.map((entry: any, index: number) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </CardContent>

    </Card>
  );
};

export default CategoryPieChart;