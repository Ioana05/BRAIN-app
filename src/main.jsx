import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { registerSW } from "virtual:pwa-register";
import NotificationGate from "./components/NotificationGate.jsx";
import { NotificationsProvider } from "./contexts/notifications.context.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NotificationGate>
      <NotificationsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotificationsProvider>
    </NotificationGate>
  </StrictMode>
);

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});
