import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      toast.error('✅ Silakan verifikasi Captcha');
      return;
    }
    try {
      await axios.post('${API_BASE_URL}/api/user/register', {
        ...form,
        captcha: captchaValue,
      });
      toast.success('🎉 Pendaftaran berhasil!');
      navigate('/login');
    } catch (err) {
      toast.error(
        '❌ Gagal daftar: ' +
          (err.response?.data?.message || 'Terjadi kesalahan')
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Kiri */}
      <div className="hidden lg:flex w-1/2 bg-white dark:bg-[#101525] p-10">
        <div className="m-auto text-center max-w-sm">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Bergabunglah dengan Kami!
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Daftar untuk menikmati kemudahan booking mobil, promo eksklusif,
            dan layanan premium 24/7 di Shark Rent Car.
          </p>
          <ul className="text-left space-y-2 text-gray-600 dark:text-gray-400">
            <li>• Booking instan dalam 3 langkah</li>
            <li>• Diskon spesial member</li>
            <li>• Support 24 jam</li>
          </ul>
        </div>
      </div>

      {/* Kanan */}
      <div className="flex w-full lg:w-1/2 justify-center bg-gradient-to-br from-[#f0f2f5] via-white to-[#f0f2f5] dark:from-[#0b0e1c] dark:via-[#11172a] dark:to-[#0b0e1c] p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-24 w-full max-w-md bg-white dark:bg-[#101525] rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-pink-600 dark:text-pink-400">
            REGISTER
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Nama */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Nama Lengkap
              </label>
              <input
                name="name"
                type="text"
                placeholder="Nama pelanggan"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email pelanggan"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Password minimal 6 karakter"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Nomor HP
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="08xxxx"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Alamat Lengkap
              </label>
              <textarea
                name="address"
                placeholder="Alamat lengkap kamu"
                value={form.address}
                onChange={handleChange}
                required
                rows={2}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={setCaptchaValue}
              />
            </div>

            {/* Register Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition"
            >
              🚀 DAFTAR SEKARANG
            </motion.button>

            {/* Google */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => toast.info('🔐 Register with Google belum tersedia')}
              className="w-full mt-2 flex items-center justify-center gap-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-800 dark:text-white py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Register with Google
            </motion.button>
          </form>

          {/* Divider + Login */}
          <div className="mt-6 text-center">
            <div className="flex items-center gap-2 my-4">
              <div className="flex-1 h-px bg-gray-300 dark:bg-slate-600" />
              <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Sudah punya akun?
              </span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-slate-600" />
            </div>
            <motion.button
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg transition"
            >
              LOGIN
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}