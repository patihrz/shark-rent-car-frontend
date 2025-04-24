import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import StatCard from '../components/StatCard';
import SearchBar from '../components/SearchBar';
import BookingDetailModal from '../components/BookingDetailModal';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const navigate = useNavigate();

  // Ambil JWT admin
  const token =
    localStorage.getItem('adminToken') ||
    sessionStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }

    axios
      .get('${API_BASE_URL}/api/booking', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setBookings(res.data);
        setFiltered(res.data);
      })
      .catch((err) => {
        console.error('❌ Gagal fetch data booking:', err);
        toast.error('❌ Gagal memuat data booking');
      });
  }, [navigate, token]);

  const handleDelete = async (index) => {
    const id = bookings[index].id;
    if (!confirm('Yakin ingin menghapus booking ini?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/booking/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Booking berhasil dihapus');
      const newList = bookings.filter((b) => b.id !== id);
      setBookings(newList);
      setFiltered(newList);
    } catch (err) {
      console.error(err);
      toast.error('Gagal menghapus booking');
    }
  };

  const toggleVerifikasi = async (index) => {
    const id = bookings[index].id;
    try {
      await axios.patch(
        `${API_BASE_URL}/api/booking/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updated = bookings.map((b) =>
        b.id === id ? { ...b, verified: !b.verified } : b
      );
      setBookings(updated);
      setFiltered(updated);
      toast.success('Status verifikasi diperbarui');
    } catch (err) {
      console.error(err);
      toast.error('Gagal memperbarui verifikasi');
    }
  };

  const handleSearch = (term) => {
    if (!term) return setFiltered(bookings);
    setFiltered(
      bookings.filter((b) =>
        b.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const totalBooking = bookings.length;
  const totalVerified = bookings.filter((b) => b.verified).length;
  const totalUnverified = totalBooking - totalVerified;

  const handleExport = () => {
    window.open('${API_BASE_URL}/api/booking/export', '_blank');
  };

  const handleDownloadStruk = async (id) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/booking/receipt/${id}`,
        {
          responseType: 'blob',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `struk-booking-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      toast.error('❌ Gagal mengunduh struk');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-white dark:bg-[#0b0e1c] text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6"
        >
          📋 Daftar Booking Masuk
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard title="Total Booking" value={totalBooking} icon="📦" color="bg-cyan-500" />
          <StatCard title="Terverifikasi" value={totalVerified} icon="✅" color="bg-green-500" />
          <StatCard title="Belum Verifikasi" value={totalUnverified} icon="⏳" color="bg-yellow-500" />
        </div>

        <SearchBar onSearch={handleSearch} />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleExport}
          className="mb-6 px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl"
        >
          📤 Export ke Excel
        </motion.button>

        {filtered.length === 0 ? (
          <p className="text-gray-500 dark:text-slate-400">Belum ada booking.</p>
        ) : (
          <div className="grid gap-6">
            {filtered.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-gray-100 dark:bg-[#111827] border rounded-xl p-5 shadow-sm"
              >
                <div className="flex justify-between">
                  <div>
                    <h2
                      className="text-xl font-semibold text-cyan-600 dark:text-cyan-400 cursor-pointer"
                      onClick={() => setSelectedBooking(b)}
                    >
                      {b.name}
                    </h2>
                    <p className="text-sm mt-1">
                      Tanggal: {b.tanggal} | Durasi: {b.durasi} hari
                    </p>
                    {b.catatan && (
                      <p className="text-sm italic mt-2">“{b.catatan}”</p>
                    )}
                    <div className="mt-3 space-x-4">
                      <a
                        href={`${API_BASE_URL}/uploads/${b.ktp}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm underline"
                      >
                        📄 KTP
                      </a>
                      <a
                        href={`${API_BASE_URL}/uploads/${b.kk}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm underline"
                      >
                        📄 KK
                      </a>
                      <button
                        onClick={() => handleDownloadStruk(b.id)}
                        className="text-sm text-green-600 hover:underline ml-2"
                      >
                        📄 Unduh Struk
                      </button>
                    </div>
                    <label className="inline-flex items-center mt-3 gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={b.verified || false}
                        onChange={() => toggleVerifikasi(i)}
                        className="accent-cyan-500"
                      />
                      <span>Verifikasi ✔</span>
                    </label>
                    <button
                      onClick={() => handleDelete(i)}
                      className="text-red-600 mt-3 hover:underline text-sm"
                    >
                      🗑 Hapus
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {selectedBooking && (
          <BookingDetailModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
          />
        )}
      </div>
    </div>
  );
}
