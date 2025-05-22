import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/articles/generated" />} />
      <Route path="/articles/:tab" element={<Dashboard />} />
    </Routes>
  );
}
