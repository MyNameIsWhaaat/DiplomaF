import { useState } from 'react'
import AuthPage from "../src/pages/AuthPage";
import RegisterPage from "../src/pages/RegisterPage";
import { Routes, Route } from "react-router-dom";
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App
