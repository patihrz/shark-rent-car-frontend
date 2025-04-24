import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0e1c] via-[#11172a] to-[#0b0e1c] flex flex-col items-center justify-center text-white text-center px-4 relative overflow-hidden">
      
      {/* 🌌 Background Bintang */}
      <div className="absolute inset-0 z-0 bg-[url('/stars.svg')] bg-cover opacity-10 pointer-events-none" />

      {/* 👽 Konten 404 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="z-10"
      >
        <h1 className="text-7xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg">
          404
        </h1>
        <p className="mt-4 text-lg text-slate-300">Oops! Halaman tidak ditemukan.</p>
        <p className="text-sm text-slate-400 mb-8">Mungkin kamu tersesat 🌌</p>

        <Link to="/">
          <button className="px-6 py-3 rounded-full bg-cyan-500 hover:bg-pink-500 transition text-white font-semibold shadow-lg">
            🚀 Kembali ke Beranda
          </button>
        </Link>
      </motion.div>

      {/* ⭐ Keterangan kecil bawah */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6 text-xs text-slate-600 z-10"
      >
        © 2025 Shark Rent Car — Made for the stars.
      </motion.div>
    </div>
  );
}