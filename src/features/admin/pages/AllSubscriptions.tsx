import { useEffect, useState } from "react";
import { getAllSubscriptions } from "../services/adminApi";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { deleteSubscription } from "../services/adminApi";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Eye, Pencil, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import api from "@/services/api";

interface Subscription {
  _id: string;
  name: string;
  amount: number;
  renewalDate: string;
  userId?: {
    name: string;
    email: string;
  };
}

const AllSubscriptions = () => {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [viewSub, setViewSub] = useState<Subscription | null>(null);
  const [editSub, setEditSub] = useState<Subscription | null>(null);

  useEffect(() => {
    fetchSubs();
  }, []);

  const fetchSubs = async () => {
  try {
    const data = await getAllSubscriptions();
    setSubs(data?.subscriptions || []);
  } catch (err) {
    console.error("Failed to fetch subscriptions", err);
    setSubs([]);
  }
};

  const today = new Date();

  const filteredSubs = subs.filter((sub) => {
    const renewalDate = new Date(sub.renewalDate);

    const matchSearch =
      sub.name.toLowerCase().includes(search.toLowerCase()) ||
      sub.userId?.email?.toLowerCase().includes(search.toLowerCase());

    if (filter === "active") return renewalDate > today && matchSearch;

    if (filter === "expired") return renewalDate < today && matchSearch;

    if (filter === "expiring") {
      const diffDays =
        (renewalDate.getTime() - today.getTime()) / (1000 * 3600 * 24);

      return diffDays <= 7 && diffDays > 0 && matchSearch;
    }

    return matchSearch;
  });

  const handleDelete = async (id: string) => {
    console.log("Deleting subscription:", id);
    try {
      await deleteSubscription(id);

      setSubs((prev) => prev.filter((sub) => sub._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="p-6">
      <Card className="bg-card border">
        <CardHeader>
          <CardTitle>All Subscriptions</CardTitle>
        </CardHeader>

        <CardContent className="bg-muted/30 rounded-md ">

          <div className="flex justify-between items-center gap-4 pt-4 pb-4">
            <Input
              placeholder="Search service or user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />

            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
              >
                All
              </Button>

              <Button
                variant={filter === "active" ? "default" : "outline"}
                onClick={() => setFilter("active")}
              >
                Active
              </Button>

              <Button
                variant={filter === "expired" ? "default" : "outline"}
                onClick={() => setFilter("expired")}
              >
                Expired
              </Button>

              <Button
                variant={filter === "expiring" ? "default" : "outline"}
                onClick={() => setFilter("expiring")}
              >
                Expiring Soon
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Renewal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredSubs.map((sub) => {
                const renewalDate = new Date(sub.renewalDate);

                const diffDays =
                  (renewalDate.getTime() - today.getTime()) /
                  (1000 * 3600 * 24);

                const isActive = renewalDate > today;

                return (
                  <TableRow
                    key={sub._id}
                    className={
                      diffDays <= 7 && diffDays > 0 ? "bg-yellow-500/10" : ""
                    }
                  >
                    <TableCell className="font-medium">{sub.name}</TableCell>

                    <TableCell>{sub.userId?.email || "Unknown"}</TableCell>

                    <TableCell>₹{sub.amount}</TableCell>

                    <TableCell>
                      {renewalDate.toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>

                    <TableCell>
                      {isActive ? (
                        <Badge className="bg-green-500/15 text-green-400 border-green-500/20">
                          Active
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/15 text-red-400 border-red-500/20">
                          Expired
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="end"
                          className="bg-card border shadow-lg text-white"
                        >
                          <DropdownMenuItem onClick={() => setViewSub(sub)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>

                          <DropdownMenuItem onClick={() => setEditSub(sub)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-red-500"
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent className="text-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Subscription
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(sub._id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Dialog open={!!viewSub} onOpenChange={() => setViewSub(null)}>
            <DialogContent className="text-white">
              <DialogHeader>
                <DialogTitle>Subscription Details</DialogTitle>
              </DialogHeader>

              {viewSub && (
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Service:</strong> {viewSub.name}
                  </p>

                  <p>
                    <strong>Amount:</strong> ₹{viewSub.amount}
                  </p>

                  <p>
                    <strong>Renewal:</strong>{" "}
                    {new Date(viewSub.renewalDate).toLocaleDateString("en-IN")}
                  </p>

                  <p>
                    <strong>User:</strong> {viewSub.userId?.email}
                  </p>
                </div>
              )}
            </DialogContent>
          </Dialog>
          <Dialog open={!!editSub} onOpenChange={() => setEditSub(null)}>
            <DialogContent className="text-white">
              <DialogHeader>
                <DialogTitle>Edit Subscription</DialogTitle>
              </DialogHeader>

              {editSub && (
                <div className="space-y-3">
                  <Input
                    value={editSub.name}
                    onChange={(e) =>
                      setEditSub({ ...editSub, name: e.target.value })
                    }
                  />

                  <Input
                    type="number"
                    value={editSub.amount}
                    onChange={(e) =>
                      setEditSub({ ...editSub, amount: Number(e.target.value) })
                    }
                  />

                  <Button
                    onClick={async () => {
                      await api.patch(`/subscriptions/${editSub._id}`, editSub);

                      setSubs((prev) =>
                        prev.map((s) => (s._id === editSub._id ? editSub : s)),
                      );

                      setEditSub(null);
                    }}
                  >
                    Save
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllSubscriptions;
