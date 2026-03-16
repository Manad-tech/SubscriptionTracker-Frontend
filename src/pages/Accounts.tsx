import { User, Shield, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/api/userApi";
import { Input } from "@/components/ui/input";

type User = {
  name: string
  email: string
}

const Account = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: ""
  });

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getCurrentUser();
      setUser(data);
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-card border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Profile
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Name</label>
            <Input
              className="w-full border rounded-md p-2 mt-1"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <Input
              className="w-full border rounded-md p-2 mt-1"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Security
        </h2>

        <button className="border px-4 py-2 rounded-md hover:bg-muted">
          Change Password
        </button>
      </div>

      <div className="border border-red-300 bg-red-50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-red-600 mb-3 flex items-center gap-2">
          <Trash2 className="w-5 h-5" />
          Danger Zone
        </h2>

        <button className="bg-red-500 text-white px-4 py-2 rounded-md">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Account;
