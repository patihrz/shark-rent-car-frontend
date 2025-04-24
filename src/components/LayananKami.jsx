import React from 'react';
import { motion } from "framer-motion";

const layanan = [
  { icon: "🚗", label: "Round Trip" },
  { icon: "🧳", label: "Drop Off" },
  { icon: "✈️", label: "Antar-Jemput\nBandara" },
  { icon: "🚌", label: "Vacation" },
  { icon: "🔑", label: "Lepas Kunci" },
];

const LayananKami = () => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="flex flex-wrap justify-center items-center gap-6 md:gap-10 bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-md max-w-6xl mx-auto mt-4 mb-10"
    >
      {layanan.map((item, i) => (
        <div key={i} className="flex flex-col items-center text-center w-24">
          <div className="text-4xl text-rose-500 mb-2">{item.icon}</div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-pre-line">
            {item.label}
          </p>
        </div>
      ))}
    </motion.div>
  );
};

export default LayananKami;