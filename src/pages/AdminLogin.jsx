import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('${API_BASE_URL}/api/auth/login', {
        email,
        password,
      });
      // Simpan JWT admin di storage
      localStorage.setItem('adminToken', res.data.token);
      toast.success('🛡️ Login berhasil!');
      navigate('/admin');
    } catch (err) {
      toast.error('❌ ' + (err.response?.data?.message || 'Login gagal'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-100 to-white dark:from-[#0b0e1c] dark:via-[#11172a] dark:to-[#0b0e1c] px-4 transition-colors">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-white border border-slate-200 dark:bg-[#101525] dark:border-slate-700 rounded-2xl shadow-xl p-6 text-slate-800 dark:text-white transition-all"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-600 dark:text-cyan-400">
          ADMIN LOGIN
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm text-slate-700 dark:text-slate-300">Email</label>
            <input
              type="email"
              placeholder="Email admin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-800 dark:bg-slate-800 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-slate-700 dark:text-slate-300">Password</label>
            <input
              type="password"
              placeholder="Password admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-800 dark:bg-slate-800 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-lg transition-all"
          >
            LOGIN
          </motion.button>
        </form>

        <div className="flex items-center gap-2 mt-6">
          <div className="flex-grow h-px bg-slate-300 dark:bg-slate-600" />
          <span className="text-xs text-slate-500 dark:text-slate-400">Belum punya akses?</span>
          <div className="flex-grow h-px bg-slate-300 dark:bg-slate-600" />
        </div>
      </motion.div>
    </div>
  );
}
