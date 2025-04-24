import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/themeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import useAutoLogout from './hooks/useAutoLogout';
import WhatsAppButton from './components/WhatsAppButton';
import { Toaster } from "sonner";

import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import CarsPage from './pages/CarsPage';
import CarDetailPage from './pages/CarDetailPage';
import BookingForm from './pages/BookingForm';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import BookingHistory from './pages/BookingHistory';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import NotFound from './pages/NotFound';

export default function App() {
  useAutoLogout();

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-white dark:bg-[#0b0e1c] text-black dark:text-white transition-colors duration-500">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* 🌐 Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/cars" element={<CarsPage />} />
            <Route path="/cars/:slug" element={<CarDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="*" element={<NotFound />} />

            {/* 🔒 Protected User */}
            <Route
              path="/booking/:slug"
              element={
                <ProtectedRoute role="user">
                  <BookingForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute role="user">
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking-history"
              element={
                <ProtectedRoute role="user">
                  <BookingHistory />
                </ProtectedRoute>
              }
            />

            {/* 🔐 Protected Admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </ThemeProvider>
  );
}