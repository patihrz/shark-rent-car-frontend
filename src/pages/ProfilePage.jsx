import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cek token dan data user di localStorage atau sessionStorage
    const token =
      localStorage.getItem('userToken') ||
      sessionStorage.getItem('userToken');
    const userData =
      localStorage.getItem('userData') ||
      sessionStorage.getItem('userData');

    if (!token || !userData) {
      toast.error('Kamu belum login!');
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 px-4 bg-gradient-to-b from-[#f0f2f5] via-white to-[#f0f2f5] text-slate-900 dark:from-[#0b0e1c] dark:via-[#11172a] dark:to-[#0b0e1c] dark:text-white transition-colors duration-300">
      <div className="max-w-xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
        >
          👤 Profil Pelanggan
        </motion.h1>

        <div className="bg-white dark:bg-[#101525] border border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow space-y-3">
          <p><strong>📛 Nama:</strong> {user.name}</p>
          <p><strong>📧 Email:</strong> {user.email}</p>
          <p><strong>📞 Telepon:</strong> {user.phone}</p>
          <p><strong>🏠 Alamat:</strong> {user.address}</p>
        </div>
      </div>
    </div>
  );
}
