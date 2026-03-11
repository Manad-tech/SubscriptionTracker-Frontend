import axios from "axios";

export const fetchNotifications = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get("http://localhost:5000/api/notifications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
