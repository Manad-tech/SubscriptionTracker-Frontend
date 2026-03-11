import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import {
  getSubscriptionById,
  updateSubscription,
} from "@/features/subscriptions/services/subscriptionServices";
import { Controller, useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditSubscription = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, control } = useForm();

  // const [formData, setFormData] = useState({
  //   name: "",
  //   amount: "",
  //   billingCycle: "",
  //   category: "",
  //   renewalDate: "",
  //   isShared: false,
  // });

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    const data = await getSubscriptionById(id!);

    const sub = data.subscription;

    reset({
      name: sub.name,
      amount: sub.amount,
      billingCycle: sub.billingCycle,
      category: sub.category,
      renewalDate: sub.renewalDate.split("T")[0],
      isShared: sub.isShared,
    });
  };

  const onSubmit = async (data: any) => {
    await updateSubscription(id!, {
      ...data,
      amount: Number(data.amount),
    });

    navigate("/history");
  };

  // const handleChange = (e: any) => {
  //   const { name, value, type, checked } = e.target;

  //   setFormData({
  //     ...formData,
  //     [name]: type === "checkbox" ? checked : value,
  //   });
  // };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   try {
  //     await updateSubscription(id!, {
  //       ...formData,
  //       amount: Number(formData.amount),
  //     });

  //     navigate("/history");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Edit Subscription</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label>Service Name</Label>
          <Input {...register("name")} />
        </div>

        <div className="space-y-2">
          <Label>Amount</Label>
          <Input {...register("amount")} />
        </div>

        <div className="space-y-2">
          <Label>Billing Cycle</Label>

          <Controller
            control={control}
            name="billingCycle"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select billing cycle" />
                </SelectTrigger>

                <SelectContent className="bg-card border border-border rounded-md p-1">
                  <SelectItem
                    value="Monthly"
                    className="cursor-pointer rounded-sm px-3 py-2 text-white hover:bg-primary/20 focus:bg-primary/20"
                  >
                    Monthly
                  </SelectItem>
                  <SelectItem
                    value="Yearly"
                    className="cursor-pointer rounded-sm px-3 py-2 text-white hover:bg-primary/20 focus:bg-primary/20"
                  >
                    Yearly
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Input {...register("category")} />
        </div>

        <div className="space-y-2">
          <Label>Renewal Date</Label>
          <Input type="date" {...register("renewalDate")} />
        </div>

        <div className="flex items-center gap-3">
          <Input type="checkbox" {...register("isShared")} />
          <Label>Shared Subscription</Label>
        </div>

        <div className="flex gap-3">
          <Button type="submit" className="flex-1">
            Update Subscription
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/history")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditSubscription;
