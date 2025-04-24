import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token =
      localStorage.getItem('userToken') ||
      sessionStorage.getItem('userToken');
    if (token) navigate('/');
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      toast.error('✅ Silakan verifikasi Captcha');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
        captcha: captchaValue,
      });
      const { token, user } = res.data;
      if (rememberMe) {
        localStorage.setItem('userToken', token);
        localStorage.setItem('userData', JSON.stringify(user));
      } else {
        sessionStorage.setItem('userToken', token);
        sessionStorage.setItem('userData', JSON.stringify(user));
      }
      toast.success('🚀 Login berhasil, selamat berpetualang!');
      const redirectTo = location.state?.from || '/';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(
        '❌ Login gagal: ' +
          (err.response?.data?.message || 'Terjadi kesalahan')
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Kiri: Iklan */}
      <div className="hidden lg:flex w-1/2 bg-white dark:bg-[#101525] p-10">
        <div className="m-auto text-center max-w-sm">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Selamat Datang Kembali!
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Login untuk melanjutkan perjalananmu dengan Shark Rent Car. Nikmati kemudahan booking, promo eksklusif, dan support 24/7.
          </p>
          <ul className="text-left space-y-2 text-gray-600 dark:text-gray-400">
            <li>• Login cepat dan mudah</li>
            <li>• Akses histori booking</li>
            <li>• Keamanan terjamin</li>
          </ul>
        </div>
      </div>

      {/* Kanan: Form */}
      <div className="flex w-full lg:w-1/2 justify-center bg-gradient-to-br from-[#f0f2f5] via-white to-[#f0f2f5] dark:from-[#0b0e1c] dark:via-[#11172a] dark:to-[#0b0e1c] p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-24 w-full max-w-md bg-white dark:bg-[#101525] rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-cyan-600 dark:text-cyan-400">
            🚗 LOGIN
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-cyan-500 h-4 w-4"
                />
                Ingat saya
              </label>
              <button
                type="button"
                onClick={() => toast.info('🔐 Fitur lupa password belum tersedia')}
                className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                Lupa password?
              </button>
            </div>

            {/* Captcha */}
            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={setCaptchaValue}
              />
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-semibold transition"
            >
              🚀 LOGIN & BOOK SEKARANG
            </motion.button>

            {/* Google */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => toast.info('🔐 Login with Google belum tersedia')}
              className="w-full mt-2 flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Login with Google
            </motion.button>
          </form>

          {/* Divider + Register */}
          <div className="mt-6 text-center">
            <div className="flex items-center gap-2 my-4">
              <div className="flex-1 h-px bg-slate-300 dark:bg-slate-600" />
              <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                Belum punya akun?
              </span>
              <div className="flex-1 h-px bg-slate-300 dark:bg-slate-600" />
            </div>
            <motion.button
              onClick={() => navigate('/register')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition"
            >
              DAFTAR & DAPATKAN DISKON
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
