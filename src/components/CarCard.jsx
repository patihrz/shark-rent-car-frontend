import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CarCard({ car }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-xl bg-white shadow-md border border-slate-200 transition"
    >
      <img
        src={car.image}
        alt={car.name}
        className="rounded-md h-40 w-full object-cover mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{car.name}</h2>
      <p className="text-slate-600 mb-4">{car.price}</p>
      <Link
        to={`/cars/${car.id}`}
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
      >
        Lihat Detail
      </Link>
    </motion.div>
  );
}
