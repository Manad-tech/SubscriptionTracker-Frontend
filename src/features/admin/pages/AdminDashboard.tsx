import { useEffect, useState } from "react";
import { getAdminStats, getUpcomingRenewals } from "../services/adminApi";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Users, CreditCard, IndianRupee, Bell } from "lucide-react";

interface Stats {
  totalUsers: number;
  totalSubscriptions: number;
  totalRevenue: number;
}

interface Renewal {
  _id: string;
  name: string;
  renewalDate: string;
}

const AdminDashboard = () => {

  const [stats, setStats] = useState<Stats | null>(null);
  const [renewals, setRenewals] = useState<Renewal[]>([]);

  useEffect(() => {
    fetchStats();
    fetchRenewals();
  }, []);

  const fetchStats = async () => {
    const data = await getAdminStats();
    setStats(data);
  };

  const fetchRenewals = async () => {
    const data = await getUpcomingRenewals();
    setRenewals(data);
  };

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-semibold">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}

      <div className="grid grid-cols-4 gap-4">

        <Card>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Total Users</CardTitle>
            <Users size={18} />
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {stats.totalUsers}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Subscriptions</CardTitle>
            <CreditCard size={18} />
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {stats.totalSubscriptions}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Total Revenue</CardTitle>
            <IndianRupee size={18} />
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              ₹{stats.totalRevenue}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Upcoming Renewals</CardTitle>
            <Bell size={18} />
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {renewals.length}
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Upcoming Renewals List */}

      <Card>

        <CardHeader>
          <CardTitle>Upcoming Renewals</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">

          {renewals.map((sub) => (

            <div
              key={sub._id}
              className="flex justify-between border-b pb-2"
            >

              <span>{sub.name}</span>

              <span className="text-muted-foreground">
                {new Date(sub.renewalDate).toLocaleDateString("en-IN")}
              </span>

            </div>

          ))}

          {renewals.length === 0 && (
            <p className="text-muted-foreground text-sm">
              No upcoming renewals
            </p>
          )}

        </CardContent>

      </Card>

    </div>
  );
};

export default AdminDashboard;