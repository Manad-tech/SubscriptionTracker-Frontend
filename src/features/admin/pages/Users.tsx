import { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUser,
  getUserSubscriptions,
} from "../services/adminApi";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { MoreHorizontal, Trash, Eye } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  subscriptionCount: number;
}

interface Subscription {
  _id: string;
  name: string;
  amount: number;
  renewalDate: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userSubs, setUserSubs] = useState<Subscription[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleViewSubscriptions = async (user: User) => {
    console.log("CLICKED USER", user);

    try {
      const data = await getUserSubscriptions(user._id);
      setSelectedUser(user);
      setUserSubs(data);
    } catch (error) {
      console.error("Failed to fetch subscriptions", error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6">
      <Card className="bg-card border">
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>

        <CardContent className="bg-muted/30 rounded-md space-y-4">
          <div className="flex justify-between items-center pt-4 pb-4">
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subscriptions</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.name}</TableCell>

                  <TableCell>{user.email}</TableCell>

                  <TableCell>{user.subscriptionCount}</TableCell>

                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString("en-IN")}
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="bg-card border shadow-lg text-foreground "
                      >
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleViewSubscriptions(user)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Subscriptions
                        </DropdownMenuItem>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                              className="text-red-500 cursor-pointer"
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>

                          <AlertDialogContent className="text-foreground">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete User</AlertDialogTitle>

                              <AlertDialogDescription>
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>

                              <AlertDialogAction 
                                className="bg-red-500"
                                onClick={() => handleDelete(user._id)}
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-lg text-foreground">
          <DialogHeader>
            <DialogTitle>Subscriptions — {selectedUser?.email}</DialogTitle>
          </DialogHeader>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Renewal</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {userSubs.map((sub) => (
                <TableRow key={sub._id}>
                  <TableCell>{sub.name}</TableCell>
                  <TableCell>₹{sub.amount}</TableCell>
                  <TableCell>
                    {new Date(sub.renewalDate).toLocaleDateString("en-IN")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
