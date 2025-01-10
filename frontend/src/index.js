import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";

// ----- Import pages
import NavigationBar from "./components/Layout/NavigationBar";
// import Footer from "./components/Layout/Footer";
import Dashboard from "./pages/Dashboard";
import BusManagement from "./pages/BusManagement";
import ScheduleManagement from "./pages/ScheduleManagement";
import Reservations from "./pages/Reservations";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Import main CSS files
import "./styles/error.css";
import "./styles/master.css";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <NavigationBar />
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/bus-management" element={<BusManagement />} />
      <Route path="/schedule-management" element={<ScheduleManagement />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
    {/* <Footer /> */}
  </Router>
);
