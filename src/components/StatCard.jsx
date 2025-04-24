import React from 'react';

export default function StatCard({ label, value, color }) {
  return (
    <div className={`p-5 rounded-xl shadow-md text-white ${color} transition-all`}>
      <h3 className="text-sm font-medium opacity-80">{label}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}