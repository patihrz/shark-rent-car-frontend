import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useTheme } from '../context/themeContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');

    setIsUser(!!userToken);
    setIsAdmin(!!adminToken);
    setMenuOpen(false); // Tutup menu saat route berubah
  }, [location]);

  const logout = () => {
    if (isAdmin) {
      localStorage.removeItem('adminToken');
      sessionStorage.removeItem('adminToken');
      toast.success('Admin berhasil logout');
      navigate('/admin/login');
    } else {
      localStorage.removeItem('userToken');
      sessionStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      sessionStorage.removeItem('userData');
      toast.success('Logout berhasil');
      navigate('/login');
    }
  };

  const NavLink = ({ to, children }) => (
    <Link to={to} className="hover:text-cyan-400 dark:hover:text-cyan-300 transition">
      {children}
    </Link>
  );

  const navLinks = (
    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 font-medium">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/aboutus">About Us</NavLink>
      <NavLink to="/cars">Cars</NavLink>

      {!isUser && !isAdmin && (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}

      {isUser && (
        <>
          <NavLink to="/profile">Profil</NavLink>
          <NavLink to="/booking-history">Histori</NavLink>
        </>
      )}

      {isAdmin && <NavLink to="/admin">Dashboard</NavLink>}

      {(isUser || isAdmin) && (
        <button
          onClick={logout}
          className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition"
        >
          Logout
        </button>
      )}

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
      >
        {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-white" />}
      </button>
    </div>
  );

  return (
    <nav className="bg-white dark:bg-[#0b0e1c] text-black dark:text-white border-b border-slate-300 dark:border-slate-700 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent"
        >
          Shark Rent Car
        </Link>

        <div className="hidden md:flex">{navLinks}</div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden px-6 pb-4 pt-2 bg-white dark:bg-[#0b0e1c] border-t border-slate-300 dark:border-slate-700"
          >
            {navLinks}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
