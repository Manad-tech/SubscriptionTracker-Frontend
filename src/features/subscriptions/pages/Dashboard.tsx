import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { getSubscriptions } from "@/features/subscriptions/services/subscriptionServices";
import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";

import SpendingTrendChart from "@/components/charts/SpendingTrendChart";
import CategoryPieChart from "@/components/charts/CategoryPieChart";
import RenewalBarChart from "@/components/charts/RenewalBarChart";

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const data = await getSubscriptions();

      console.log(data);
      setSubscriptions(data.subscriptions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      setLoading(false);
    }
  };

  const totalSubscriptions = subscriptions.length;

  const monthlySpend = subscriptions?.reduce((total, sub) => {
    return total + Number(sub.amount || 0);
  }, 0);

  const trendData = subscriptions.map((sub: any) => ({
    name: sub.name,
    amount: sub.amount,
  }));

  const categoryData = subscriptions.reduce((acc: any, sub: any) => {
    const existing = acc.find((c: any) => c.name === sub.category);

    if (existing) {
      existing.value += sub.amount;
    } else {
      acc.push({ name: sub.category, value: sub.amount });
    }

    return acc;
  }, []);

  const renewalData = subscriptions.map((sub: any) => ({
    name: sub.name,
    renewal: new Date(sub.renewalDate).getDate(),
    category: sub.category
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-4 gap-6 ">
        <Card>
          <CardHeader>
            <CardDescription>Total Subscriptions</CardDescription>
            <CreditCard className="w-4 h-4 text-muted-foreground" />
            <CardTitle className="text-2xl">{totalSubscriptions} </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Monthly Spend</CardDescription>
            <CardTitle className="text-2xl">{monthlySpend} </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Active Plans</CardDescription>
            <CardTitle className="text-2xl">{totalSubscriptions} </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Upcoming Renewals</CardDescription>
            <CardTitle className="text-2xl">{renewalData.length} </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6 min-w-0">
        <SpendingTrendChart data={trendData} />
        <CategoryPieChart categoryData={categoryData} />
      </div>

      <div className="mt-6">
        <RenewalBarChart renewalData={renewalData} />
      </div>
    </div>
  );
};

export default Dashboard;
