import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import cars from '../data/cars';
import slugify from '../utils/slugify';

export default function BookingForm() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [user, setUser] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobil: '',
    tanggal: '',
    durasi: '',
    catatan: '',
    ktp: null,
    kk: null,
  });

  useEffect(() => {
    // Ambil token & data user dari localStorage atau sessionStorage
    const token =
      localStorage.getItem('userToken') ||
      sessionStorage.getItem('userToken');
    const userData =
      localStorage.getItem('userData') ||
      sessionStorage.getItem('userData');

    // Set user untuk prefill form
    const parsedUser = userData ? JSON.parse(userData) : null;
    setUser(parsedUser);

    // Cari data mobil dari slug
    const car = cars.find((c) => slugify(c.name) === slug);
    if (!car) {
      toast.error('Mobil tidak ditemukan');
      navigate('/cars');
      return;
    }
    setSelectedCar(car);

    // Prefill form dengan data user dan mobil
    setForm((prev) => ({
      ...prev,
      name: parsedUser?.name || '',
      email: parsedUser?.email || '',
      mobil: car.name,
    }));
  }, [slug, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let updatedValue = value;

    if (name === 'durasi') {
      const num = parseInt(value);
      if (isNaN(num) || num < 1) {
        toast.error('Durasi minimal 1 hari');
        updatedValue = '1';
      } else if (num > 30) {
        toast.error('Durasi maksimal 30 hari');
        updatedValue = '30';
      }
    }

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numDurasi = parseInt(form.durasi);
    if (isNaN(numDurasi) || numDurasi < 1 || numDurasi > 30) {
      toast.error('Durasi harus antara 1 hingga 30 hari');
      return;
    }

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    const token =
      localStorage.getItem('userToken') ||
      sessionStorage.getItem('userToken');

    try {
      await axios.post('http://localhost:5000/api/booking', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('✅ Booking berhasil dikirim!');
      navigate('/booking-history', { replace: true });
    } catch (err) {
      console.error(err);
      toast.error('❌ Gagal kirim booking');
    }
  };

  // Jika belum ada user atau mobil, tunggu
  if (!user || !selectedCar) return null;

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-white dark:bg-[#0b0e1c] text-black dark:text-white">
      <div className="max-w-2xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
        >
          📋 Form Booking Mobil
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex items-center gap-4 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl p-4"
        >
          <img
            src={selectedCar.image || '/fallback-car.jpg'}
            alt={selectedCar.name}
            className="w-20 h-14 object-cover rounded-lg"
          />
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Mobil yang dipesan:</p>
            <p className="font-semibold">{selectedCar.name}</p>
          </div>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#0b0e1c] text-black dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl p-6 shadow-lg space-y-5"
        >
          <InputField label="Nama Lengkap" name="name" type="text" value={form.name} readOnly />
          <InputField label="Email" name="email" type="email" value={form.email} readOnly />
          <InputField label="Mobil yang Dipesan" name="mobil" type="text" value={form.mobil} readOnly />
          <InputField label="Tanggal Booking" name="tanggal" type="date" value={form.tanggal} onChange={handleChange} min={today} />
          <InputField label="Durasi (hari, max 30)" name="durasi" type="number" value={form.durasi} onChange={handleChange} />
          <InputField label="Catatan Tambahan" name="catatan" type="text" value={form.catatan} onChange={handleChange} />

          <FileUpload label="Upload KTP" name="ktp" onChange={handleChange} />
          <FileUpload label="Upload KK" name="kk" onChange={handleChange} />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold transition-all"
          >
            🚀 Kirim Booking
          </motion.button>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, name, type, value, onChange, readOnly, min }) {
  return (
    <div>
      <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        min={min}
        required
        className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-800 text-black dark:text-white border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition ${readOnly ? 'opacity-70 cursor-not-allowed' : ''}`}
      />
    </div>
  );
}

function FileUpload({ label, name, onChange }) {
  const [fileName, setFileName] = useState('');
  const [previewURL, setPreviewURL] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('❌ File terlalu besar (maks 2MB)');
        return;
      }
      setFileName(file.name);
      if (file.type.startsWith('image/')) {
        setPreviewURL(URL.createObjectURL(file));
      } else {
        setPreviewURL(null);
      }
      onChange(e);
    }
  };

  return (
    <div>
      <label className="block mb-1 font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <input
        name={name}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleFileChange}
        required
        className="w-full file:rounded-lg file:border-0 file:bg-cyan-600 file:text-white file:py-2 file:px-4 bg-white dark:bg-slate-800 text-black dark:text-white border border-slate-300 dark:border-slate-600"
      />
      {fileName && (
        <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          📎 {fileName}
        </div>
      )}
      {previewURL && (
        <img
          src={previewURL}
          alt="Preview"
          className="mt-2 h-20 rounded-lg border border-slate-300 dark:border-slate-600 object-cover"
        />
      )}
    </div>
  );
}
