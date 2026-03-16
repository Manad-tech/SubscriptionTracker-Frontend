export type Subscription = {
  id: string,
  name: string,
  amount: number,
  currency: 'INR' | 'EUR' | 'USD';
  billing_cycle: "Monthly" | "Yearly",
  category: string,
  renewal_date: string,
  is_shared: boolean
}