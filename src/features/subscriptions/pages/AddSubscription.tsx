import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createSubscriptions } from "@/features/subscriptions/services/subscriptionServices";
import type{ Subscription } from "@/types/subscription";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const AddSubscription = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Subscription>({
  id: "",
  name: "",
  amount: 0,
  currency: "INR",
  billing_cycle: "Monthly",
  category: "",
  renewal_date: "",
  is_shared: false
});

  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await createSubscriptions(formData);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating subscription", error);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    setFormData({
      ...formData,
      amount: value,
    });
  };

  const handleCurrencyChange = async (value: string) => {
    setFormData({
      ...formData,
      currency: value as "INR" | "EUR" | "USD",
    });

    await convertCurrency(value);
  };

  const convertCurrency = async (targetCurrency: string) => {
    try {
      const res = await axios.get(
        "https://api.exchangerate-api.com/v4/latest/INR",
      );

      const rate = res.data.rates[targetCurrency];

      if (rate) {
        const converted = Number(formData.amount) * rate;
        setConvertedAmount(converted);
      }
    } catch (error) {
      console.error("Conversion error", error);
    }
  };
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-6 ">Add Subscription</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            placeholder="10"
            value={formData.amount}
            onChange={handleAmountChange}
          />
        </div>

        <div className="space-y-2">
          <Label>Billing Cycle</Label>

          <Select
            value={formData.billing_cycle}
            onValueChange={(value) =>
              setFormData({ ...formData, billing_cycle: value as 'Monthly' | 'Yearly' })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select billing cycle" />
            </SelectTrigger>

            <SelectContent className="bg-card text-foreground">
              <SelectItem value="Monthly">Monthly</SelectItem>
              <SelectItem value="Yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Currency</Label>

          <Select
            value={formData.currency}
            onValueChange={handleCurrencyChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>

            <SelectContent className="bg-card text-foreground">
              <SelectItem value="INR">INR</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
            </SelectContent>
          </Select>

          {convertedAmount && (
            <p>Converted: {convertedAmount.toFixed(2)} {formData.currency} </p>
          )}
        </div>

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

        <div className="space-y-2">
          <Label htmlFor="renewalDate">Renewal Date</Label>
          <Input
            id="renewalDate"
            name="renewalDate"
            type="date"
            value={formData.renewal_date}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full">
          Add Subscription
        </Button>
      </form>
    </div>
  );
};

export default AddSubscription;
