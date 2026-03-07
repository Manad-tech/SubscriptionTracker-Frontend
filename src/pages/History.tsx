import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getSubscriptions } from "@/services/subscriptionServices";
import { Pencil, Trash2 } from "lucide-react";

const History = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const data = await getSubscriptions();
      setSubscriptions(data.subscriptions);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="space-y-6 ">
      <h1 className="text-2xl font-semibold">Subscription History</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Billing</TableHead>
            <TableHead>Renewal</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {subscriptions.map((sub: any) => (
            <TableRow key={sub._id}>
              <TableCell>{sub.name} </TableCell>
              <TableCell>{sub.category} </TableCell>
              <TableCell>{sub.amount} </TableCell>
              <TableCell>{sub.billingCycle} </TableCell>
              <TableCell>
                {new Date(sub.renewalDate).toLocaleDateString()}{" "}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button
                  variant={"outline"}
                  onClick={() => navigate("/edit/${sub._id}")}
                >
                  <Pencil/>
                </Button>

                <Button
                  variant={"destructive"}
                  >
                    <Trash2 />
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default History;
