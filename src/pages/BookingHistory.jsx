import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cek token dan data user di localStorage atau sessionStorage
    const token =
      localStorage.getItem('userToken') ||
      sessionStorage.getItem('userToken');
    const userData =
      localStorage.getItem('userData') ||
      sessionStorage.getItem('userData');

    if (!token || !userData) {
      toast.error('⚠️ Kamu belum login!');
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    axios
      .get(`${API_BASE_URL}/api/booking/user/${parsedUser.email}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBookings(res.data))
      .catch((err) => {
        toast.error('❌ Gagal mengambil data booking');
        console.error(err);
      });
  }, [navigate]);

  const handleDownloadStruk = async (id) => {
    // Ambil token dari localStorage atau sessionStorage
    const token =
      localStorage.getItem('userToken') ||
      sessionStorage.getItem('userToken');

    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/booking/receipt/${id}`,
        {
          responseType: 'blob',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Buat URL untuk blob dan trigger download
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
    <div className="min-h-screen px-6 pt-24 pb-16 transition-colors bg-white text-gray-900 dark:bg-[#0b0e1c] dark:text-white">
      <div className="max-w-5xl mx-auto space-y-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
        >
          📝 Riwayat Booking Anda
        </motion.h1>

        {bookings.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 dark:text-slate-400 text-lg"
          >
            Belum ada booking yang dilakukan.
          </motion.p>
        ) : (
          <div className="grid gap-6">
            {bookings.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="p-6 rounded-xl border shadow-md hover:shadow-lg transition-all duration-300 bg-gray-100 border-gray-300 text-gray-900 dark:bg-[#101524] dark:border-slate-700 dark:text-white"
              >
                <div className="mb-4 space-y-1">
                  <h2 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400">{b.mobil}</h2>
                  <p><span className="font-semibold">📅 Tanggal:</span> {b.tanggal}</p>
                  <p><span className="font-semibold">⏱ Durasi:</span> {b.durasi} hari</p>
                  {b.catatan && (
                    <p className="italic text-sm text-gray-500 dark:text-slate-400">“{b.catatan}”</p>
                  )}
                  <p className="mt-2">
                    <span className="font-semibold">🔐 Status:</span>{' '}
                    {b.verified ? (
                      <span className="text-green-600 dark:text-green-400 font-bold">✅ Terverifikasi</span>
                    ) : (
                      <span className="text-yellow-600 dark:text-yellow-400 font-bold">⏳ Menunggu Verifikasi</span>
                    )}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 mt-4 text-sm font-medium">
                  <a
                    href={`${API_BASE_URL}/uploads/${b.ktp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    🪪 Lihat KTP
                  </a>
                  <a
                    href={`${API_BASE_URL}/uploads/${b.kk}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    🏠 Lihat KK
                  </a>
                  <button
                    onClick={() => handleDownloadStruk(b.id)}
                    className="cursor-pointer text-green-600 dark:text-green-400 hover:underline bg-none p-0"
                  >
                    📄 Unduh Struk
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
