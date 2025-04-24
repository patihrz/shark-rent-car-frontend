import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import carData from '../data/cars';
import slugify from '../utils/slugify';

export default function CarDetailPage() {
  const { slug } = useParams();

  const car = carData.find((c) => slugify(c.name) === slug);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black dark:text-white pt-24 text-center bg-white dark:bg-[#0b0e1c]">
        <p className="text-xl">❌ Mobil tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 bg-white dark:bg-gradient-to-b dark:from-[#0b0e1c] dark:via-[#11172a] dark:to-[#0b0e1c] text-black dark:text-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-[#0b0e1c] text-black dark:text-white border border-slate-700 rounded-xl shadow-lg overflow-hidden"
        >
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-64 sm:h-96 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">{car.name}</h1>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
              {car.description || 'Mobil mewah dan elegan siap untuk petualangan Anda.'}
            </p>
            <p className="text-black dark:text-white font-bold mb-4">
              Rp {parseInt(car.price).toLocaleString('id-ID')} / hari
            </p>

            <Link
              to={`/booking/${slugify(car.name)}`}
              className="inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full font-medium transition"
            >
              🚘 Booking Sekarang
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
