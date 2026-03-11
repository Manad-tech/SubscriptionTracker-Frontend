import api from "@/services/api"

export const getAllUsers = async () => {
  const res = await api.get("/admin/users")
  return res.data
}

export const deleteUser = async (id: string) => {
  const res = await api.delete(`/admin/users/${id}`)
  return res.data
}

export const getAdminStats = async () => {
  const res = await api.get("/admin/stats");
  return res.data;
};

export const getAllSubscriptions = async () => {
  const res = await api.get('/admin/subscriptions')
  return res.data
}

export const deleteSubscription = async (id: string) => {
  const res = await api.delete(`/admin/subscriptions/${id}`);
  return res.data;
};

export const getUserSubscriptions = async (userId: string) => {
  const res = await api.get(`/subscriptions/user/${userId}`);
  return res.data.usersSubscription;
};

export const getCategoryStats = async () => {
  const res = await api.get("/subscriptions/stats/category");
  return res.data;
};

export const getTotalSpending = async () => {
  const res = await api.get("/subscriptions/stats/total");
  return res.data;
};

export const getUpcomingRenewals = async () => {
  const res = await api.get("/subscriptions/upcoming");
  return res.data;
};

export const getMonthlyRevenue = async () => {
  const res = await api.get("/admin/revenue/monthly");
  return res.data;
};

export const getUserGrowth = async () => {
  const res = await api.get("/admin/users/growth");
  return res.data;
};