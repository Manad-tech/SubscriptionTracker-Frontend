import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createSubscriptions } from "@/features/subscriptions/services/subscriptionServices";
import { useState } from "react";
import { useNavigate } from "react-router";

const AddSubscription = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    billingCycle: "",
    category: "",
    renewalDate: "",
    isShared: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log(formData);

    try {
      await createSubscriptions(formData);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating subscription", error);
    }
  };
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-6 ">Add Subscription</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

  {/* Service Name */}
  <div className="space-y-2">
    <Label htmlFor="name">Service Name</Label>
    <Input
      id="name"
      name="name"
      placeholder="Netflix"
      value={formData.name}
      onChange={handleChange}
    />
  </div>

  {/* Amount */}
  <div className="space-y-2">
    <Label htmlFor="amount">Amount</Label>
    <Input
      id="amount"
      name="amount"
      type="number"
      placeholder="10"
      value={formData.amount}
      onChange={handleChange}
    />
  </div>

  {/* Billing Cycle */}
  <div className="space-y-2">
    <Label>Billing Cycle</Label>

    <Select
      value={formData.billingCycle}
      onValueChange={(value) =>
        setFormData({ ...formData, billingCycle: value })
      }
    >
      <SelectTrigger>
        <SelectValue placeholder="Select billing cycle" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="Monthly">Monthly</SelectItem>
        <SelectItem value="Yearly">Yearly</SelectItem>
      </SelectContent>
    </Select>

  </div>

  {/* Category */}
  <div className="space-y-2">
    <Label htmlFor="category">Category</Label>
    <Input
      id="category"
      name="category"
      placeholder="Entertainment"
      value={formData.category}
      onChange={handleChange}
    />
  </div>

  {/* Renewal Date */}
  <div className="space-y-2">
    <Label htmlFor="renewalDate">Renewal Date</Label>
    <Input
      id="renewalDate"
      name="renewalDate"
      type="date"
      value={formData.renewalDate}
      onChange={handleChange}
    />
  </div>

  {/* Shared */}
  <div className="flex items-center gap-3">
    <Input
      type="checkbox"
      name="isShared"
      checked={formData.isShared}
      onChange={handleChange}
    />
    <Label>Shared Subscription</Label>
  </div>

  <Button type="submit" className="w-full">
    Add Subscription
  </Button>

</form>
    </div>
  );
};

export default AddSubscription;
