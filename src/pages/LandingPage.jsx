import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, LogOut, Rocket } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import carData from '../data/cars';
import LayananKami from "../components/LayananKami";

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute z-10 right-2 sm:right-4 top-1/2 -translate-y-1/2 cursor-pointer text-cyan-400 hover:text-cyan-600"
  >
    ▶
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute z-10 left-2 sm:left-4 top-1/2 -translate-y-1/2 cursor-pointer text-cyan-400 hover:text-cyan-600"
  >
    ◀
  </div>
);

export default function LandingPage() {
  const features = [
    {
      icon: <Rocket size={28} className="text-cyan-400" />,
      title: 'Booking Cepat & Mudah',
      desc: 'Pesan mobil favorit hanya dalam beberapa klik. Tanpa ribet, tanpa antri.',
    },
    {
      icon: <FileText size={28} className="text-purple-400" />,
      title: 'Dokumen Aman',
      desc: 'File KTP & KK kamu aman, disimpan lokal dan tidak dibagikan ke pihak lain.',
    },
    {
      icon: <ShieldCheck size={28} className="text-green-400" />,
      title: 'Akses Terlindungi',
      desc: 'Login wajib. Riwayat booking hanya bisa dilihat oleh kamu sendiri.',
    },
    {
      icon: <LogOut size={28} className="text-pink-400" />,
      title: 'Auto Logout',
      desc: 'Sistem otomatis logout jika kamu lama tidak aktif. Lebih aman.',
    },
  ];

  const promoSlider = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const carSlider = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-0 pb-16 bg-white text-black dark:bg-[#0b0e1c] dark:text-white relative transition-all">
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-[url('/stars.svg')] bg-cover bg-center opacity-10 pointer-events-none" />

      <div className="z-10 w-full h-[70vh] max-h-[700px] relative overflow-hidden mb-20">
        <Slider {...promoSlider}>
          {['promo1.jpg', 'promo2.jpg', 'promo3.jpg'].map((img, i) => (
            <div key={i} className="h-[70vh] max-h-[700px]">
              <img
                src={`/images/${img}`}
                alt={`Promo ${i + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="flex-grow flex items-center">
        <LayananKami />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center max-w-2xl mb-20 px-4"
      >
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-lg">
          Sewa Mobil. Nyaman. Cepat. Berkelas.
        </h1>
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
          🚘 Rasakan pengalaman sewa mobil premium ala masa depan bersama <strong>Shark Rent Car</strong>.
        </p>
        <Link to="/cars">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full shadow-lg transition-all font-medium tracking-wide"
          >
            Lihat Mobil
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="z-10 w-full max-w-6xl mx-auto px-6 sm:px-10"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-cyan-600 dark:text-cyan-400">
          🚘 Mobil Unggulan Minggu Ini
        </h2>
        <Slider {...carSlider}>
          {carData.slice(0, 6).map((car, i) => (
            <div key={i} className="px-2">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-slate-100 dark:bg-[#101525] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-md transition"
              >
                <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400">{car.name}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                    {car.description || 'Mobil premium terbaik untuk semua kebutuhan Anda.'}
                  </p>
                  <p className="text-black dark:text-white font-bold mb-4">
                    Rp {parseInt(car.price).toLocaleString('id-ID')} / hari
                  </p>
                  <Link
                    to={`/cars/${car.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-full text-sm transition"
                  >
                    Lihat Detail →
                  </Link>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto px-6 sm:px-10 mt-20"
      >
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-slate-100 dark:bg-[#101525] border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-lg flex flex-col items-start gap-3 transition"
          >
            {f.icon}
            <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400">{f.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-20 z-10 text-xs text-slate-500"
      />
    </div>
  );
}
