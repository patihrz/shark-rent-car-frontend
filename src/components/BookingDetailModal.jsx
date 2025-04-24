import React from 'react';
import { motion } from 'framer-motion';

export default function BookingDetailModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4 text-cyan-500">📄 Detail Booking</h2>
        <ul className="text-sm text-gray-700 dark:text-slate-300 space-y-2">
          <li><strong>Nama:</strong> {data.name}</li>
          <li><strong>Tanggal:</strong> {data.tanggal}</li>
          <li><strong>Durasi:</strong> {data.durasi} hari</li>
          {data.catatan && <li><strong>Catatan:</strong> “{data.catatan}”</li>}
          <li><strong>Verifikasi:</strong> {data.verified ? '✔ Sudah' : '❌ Belum'}</li>
        </ul>

        <div className="mt-4 flex justify-end gap-3">
          <a
            href={`http://localhost:5000/uploads/${data.ktp}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 underline"
          >
            Lihat KTP
          </a>
          <a
            href={`http://localhost:5000/uploads/${data.kk}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 underline"
          >
            Lihat KK
          </a>
        </div>

        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-pink-600 text-white rounded-lg text-sm hover:bg-pink-700 transition"
        >
          ❌ Tutup
        </button>
      </motion.div>
    </div>
  );
}