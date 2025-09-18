import NotificationList from "../components/NotificationList/NotificationList";
import { useEffect, useState } from "react";
const Notifications = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = (e) => {
      setError(e.message || "Unknown error");
    };
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", (e) => handleError(e.reason));
    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleError);
    };
  }, []);

  return (
    <>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      <NotificationList />
    </>
  );
};
export default Notifications;
