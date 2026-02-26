export type Subscription = {
  id: string,
  name: string,
  price: number,
  billing_cycle: "Monthly" | "Yearly",
  category: string,
  renewal_date: string,
  is_shared: boolean
}