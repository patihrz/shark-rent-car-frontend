import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import carData from '../data/cars';
import slugify from '../utils/slugify';
import AnimatedSpinner from '../components/AnimatedSpinner';

export default function CarsPage() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);

  const filteredCars = carData.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setCars(carData); // ✅ ini dia
      setLoading(false);
    }, 1000);
  
    return () => clearTimeout(timer);
  }, []);
  

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0b0e1c]">
        <AnimatedSpinner />
      </div>
    );
  

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-white text-black dark:bg-[#0b0e1c] dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
        >
          Pilih Mobil Anda
        </motion.h1>

        <div className="mb-6 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Cari mobil..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-black dark:text-white border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.length > 0 ? (
            filteredCars.map((car, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-100 dark:bg-[#101525] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-md hover:shadow-cyan-500/30 transition-all duration-300"
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400">{car.name}</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">{car.description}</p>
                  <p className="text-black dark:text-white font-bold mb-4">
                    Rp {parseInt(car.price).toLocaleString('id-ID')} / hari
                  </p>

                  <a
                    href={`/cars/${slugify(car.name)}`}
                    className="inline-block px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full text-sm transition"
                  >
                    Detail & Booking →
                  </a>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-slate-400 col-span-full">
              😢 Mobil tidak ditemukan.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
