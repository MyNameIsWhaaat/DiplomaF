import { useState } from 'react'
import AuthPage from "../src/pages/AuthPage";
import RegisterPage from "../src/pages/RegisterPage";
import Dashboard from "../src/pages/Dashboard";
import CourseLevelsPage from "../src/pages/CourseLevelsPage";
import LevelPage from "../src/pages/LevelPage";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import { useDashboardData } from "./hooks/useDashboardData";
import './index.css'

function App() {
  const { user } = useDashboardData();
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/courses/:id/levels" element={<CourseLevelsPage />} />
      <Route path="/courses/level/:id" element={<LevelPage />} />
      <Route path="/profile" element={<Profile user={user} />} />
    </Routes>
  );
}

export default App
