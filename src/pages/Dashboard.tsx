import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { getSubscriptions } from "@/services/subscriptionServices";
import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const data = await getSubscriptions();
      setSubscriptions(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      setLoading(false);
    }
  };

  const totalSubscriptions = subscriptions.length;

  const monthlySpend = subscriptions.reduce((total, sub) => {
    return total + Number(sub.amount || 0);
  }, 0);

  const chartData = subscriptions.map((sub: any) => ({
    name: sub.name,
    amount: sub.amount,
  }))

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
            <CardTitle className="text-2xl">2 </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Spending</CardTitle>
          <CardDescription>Price of each subscription</CardDescription>
        </CardHeader>

        <CardContent className="h-[300px]">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="price"
                stroke="#6366F1"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Subscriptions</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (<p>Loading Subscriptions...</p>) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Billing Cycle</TableHead>
                <TableHead>Renewal Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {subscriptions.map((sub) => (
                <TableRow key={sub._id}>
                  <TableCell>{sub.name} </TableCell>
                  <TableCell>{sub.price} </TableCell>
                  <TableCell>{sub.billingCycle} </TableCell>
                  <TableCell>{new Date(sub.renewalDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
