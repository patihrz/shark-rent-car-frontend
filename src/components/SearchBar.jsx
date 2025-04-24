import React from 'react';

export default function SearchBar({ onChange }) {
  return (
    <input
      type="text"
      placeholder="🔍 Cari nama booking..."
      className="w-full px-4 py-2 mb-6 rounded-xl border dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
      onChange={onChange}
    />
  );
}