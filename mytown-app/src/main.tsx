
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import AdminApp from "./admin/AdminApp.tsx";
  import "./styles/index.css";

  // Simple path-based switch: visiting /admin loads the Admin Panel,
  // any other path loads the regular MyTown app. No router library
  // needed since this project only has these two top-level pages.
  const isAdminRoute = window.location.pathname.startsWith("/admin");

  createRoot(document.getElementById("root")!).render(
    isAdminRoute ? <AdminApp /> : <App />
  );
