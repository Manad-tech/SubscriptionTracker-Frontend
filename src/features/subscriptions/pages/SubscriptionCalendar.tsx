import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import moment from "moment";
const localizer = momentLocalizer(moment);

interface Subscription {
  _id: string;
  name: string;
  renewalDate: string;
}

const SubscriptionCalendar = () => {
  const [events, setEvents] = useState<any[]>([]);

  const fetchSubscriptions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/subscriptions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const subs: Subscription[] = res.data.subscriptions || res.data;

      const formattedEvents = subs.map((sub) => ({
        title: sub.name,
        start: new Date(sub.renewalDate),
        end: new Date(sub.renewalDate),
        allDay: true,
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Failed to fetch subscriptions", error);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className="h-[500px] bg-card rounded-lg p-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      />{" "}
    </div>
  );
};

export default SubscriptionCalendar;
