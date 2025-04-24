import React from 'react';
import { motion } from 'framer-motion';
import { Users, Code, Globe2, Smile } from 'lucide-react';

export default function AboutUs() {
    const teamInfo = [
        {
          icon: <Users size={28} className="text-cyan-400" />,
          title: 'Tim Profesional & Ramah',
          desc: 'Kami terdiri dari staf yang berpengalaman di bidang transportasi dan pelayanan pelanggan, siap membantu kebutuhan Anda dengan sepenuh hati.',
        },
        {
          icon: <Globe2 size={28} className="text-green-400" />,
          title: 'Layanan Luas & Terjangkau',
          desc: 'Kami melayani penyewaan mobil untuk area lokal maupun antar kota, dengan harga kompetitif dan pilihan armada yang lengkap.',
        },
        {
          icon: <Smile size={28} className="text-pink-400" />,
          title: 'Kenyamanan & Keamanan',
          desc: 'Semua unit mobil kami dirawat rutin dan dilengkapi asuransi, demi kenyamanan dan ketenangan perjalanan Anda.',
        },
        {
          icon: <Code size={28} className="text-purple-400" />,
          title: 'Pemesanan Mudah & Cepat',
          desc: 'Dengan sistem pemesanan digital kami, Anda bisa booking mobil kapan saja dengan proses yang simpel dan transparan.',
        },
      ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 pb-16 bg-white text-black dark:bg-[#0b0e1c] dark:text-white relative transition-all">
      {/* 🔭 Background Bintang */}
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-[url('/stars.svg')] bg-cover bg-center opacity-10 pointer-events-none" />

      {/* 🧠 Intro About */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center max-w-2xl px-4"
      >
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-lg">
          Tentang Kami
        </h1>
        <p className="text-lg text-slate-700 dark:text-slate-300">
        Selamat datang di Shark Rent Car — solusi transportasi terbaik Anda! Kami menyediakan layanan sewa mobil yang mudah, cepat, dan terpercaya untuk kebutuhan pribadi, bisnis, maupun wisata. Fokus kami adalah memberikan kenyamanan, keamanan, dan pengalaman terbaik di setiap perjalanan Anda.
        </p>
      </motion.div>

      {/* 🌟 Fitur Tim */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto px-6 sm:px-10 mt-20"
      >
        {teamInfo.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-slate-100 dark:bg-[#101525] border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-lg flex flex-col items-start gap-3 transition"
          >
            {item.icon}
            <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400">{item.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* 👣 Footer About */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-20 z-10 text-xs text-slate-500"
      >
      </motion.div>
    </div>
  );
}
