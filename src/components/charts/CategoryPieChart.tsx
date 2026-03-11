import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { CATEGORY_COLORS } from "@/lib/chartColors";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const CategoryPieChart = ({ categoryData = [] }: any) => {
  if (!categoryData || categoryData.length === 0) {
    return (
      <Card>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">No category data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>Where your money goes</CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-2 h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
            >
              {(categoryData || []).map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CATEGORY_COLORS[entry.name] || "#64748B"}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col justify-center gap-3">
          {categoryData.map((item: any) => (
            <div key={item.name} className="flex items-center justify-between ">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: CATEGORY_COLORS[item.name],
                  }}
                />

                <span className="text-sm">{item.name}</span>
              </div>

              <span className="text-sm font-medium">
                ₹{item.value}
              </span>
            </div>
            
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryPieChart;
