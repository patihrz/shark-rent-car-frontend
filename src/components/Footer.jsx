import React from 'react';
import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <>
      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="bg-cyan-100 dark:bg-[#10172a] text-black dark:text-white py-10 px-6 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Gabung Bareng Kami di Instagram!</h2>
        <p className="mb-6 text-slate-600 dark:text-slate-300">
          Lihat update terbaru, behind the scene, dan promo eksklusif cuma di IG kami.
        </p>
        <a
          href="#"
          className="inline-block px-6 py-3 bg-cyan-400 text-white rounded-full hover:bg-cyan-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
          target="_blank"
          rel="noreferrer"
        >
          Follow @sharkrentcar
        </a>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-white dark:bg-[#0b0e1c] text-black dark:text-white border-t border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-sm">
          
          {/* Kiri */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p>
              &copy; {new Date().getFullYear()}{' '}
              <span className="text-cyan-400 font-semibold">Shark Rent Car</span>. All rights reserved.
            </p>
          </motion.div>

          {/* Kanan */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex gap-5"
          >
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition duration-300 hover:scale-110"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition duration-300 hover:scale-110"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition duration-300 hover:scale-110"
            >
              <Linkedin size={20} />
            </a>
          </motion.div>
        </div>
      </motion.footer>
    </>
  );
}
