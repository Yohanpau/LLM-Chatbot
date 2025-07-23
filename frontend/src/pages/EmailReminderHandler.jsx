import { useEffect, useState } from "react";
import emailjs from "emailjs-com";

function EmailReminderHandler() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const storedBills = localStorage.getItem("bills");
    if (storedBills) {
      setBills(JSON.parse(storedBills));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date().toISOString().split("T")[0];
      const notificationsAllowed = JSON.parse(
        localStorage.getItem("notificationsEnabled")
      );
      const storedEmail = localStorage.getItem("userEmail");

      if (notificationsAllowed && storedEmail && bills.length > 0) {
        bills.forEach((bill) => {
          const daysLeft =
            (new Date(bill.dueDate) - new Date(today)) / (1000 * 60 * 60 * 24);
          const key = `reminderSent-${bill.name}-${bill.dueDate}`;

          // If due in 2 days or less and not sent before
          if (daysLeft <= 2 && !localStorage.getItem(key)) {
            const templateParams = {
              email: storedEmail,
              bill_name: bill.name,
              due_date: bill.dueDate,
              amount: bill.amount,
            };

            emailjs
              .send(
                "service_p4kh83e",
                "template_knq28ca",
                templateParams,
                "muDJ0JS2U8D5QQgZ_"
              )
              .then(() => {
                console.log("Reminder sent:", bill.name);
                localStorage.setItem(key, "true"); // Mark as sent
              })
              .catch((err) => console.error("Email error:", err));
          }
        });
      }
    }, 60 * 1000); // every 1 minute

    return () => clearInterval(interval);
  }, [bills]);

  return null;
}

export default EmailReminderHandler;
