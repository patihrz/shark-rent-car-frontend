# 🦈 Shark Rent Car - Fullstack Car App Berbasis Web

**Shark Rent Car** adalah platform penyewaan mobil modern yang dirancang untuk memudahkan pengguna dalam melakukan reservasi kendaraan secara online. Dibangun dengan teknologi terbaru, platform ini menawarkan antarmuka yang elegan, cepat, dan responsif, dengan backend yang stabil dan aman.

🔗 **Live Website:** [DEMO](https://shark-rent-car.netlify.app)  
🔗 **Backend API:** [BACKEND](https://shark-rent-car-backend-production.up.railway.app)

---

## 📸 Preview


![Untitled design](https://github.com/user-attachments/assets/1e1067d3-0161-4933-93a1-5fb7f39f3eb3)

---

## 🚀 Fitur Unggulan

- 🔐 **Autentikasi Pengguna:** Login dan registrasi aman dengan validasi
- 🚗 **Daftar Mobil Lengkap:** Lihat semua kendaraan yang tersedia untuk disewa
- 📅 **Sistem Pemesanan:** Form booking dengan pemilihan tanggal dan kendaraan
- 📱 **UI Responsif:** Tampilan optimal di desktop maupun mobile
- ⚡ **Animasi Halus:** Transisi elegan dengan Framer Motion
- 📤 **Deploy Modern:** Menggunakan Netlify & Railway untuk performa tinggi
- ☁️ **Integrasi Database:** MongoDB Atlas sebagai basis data cloud

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - Library UI utama
- **Tailwind CSS** - Utility-first CSS untuk desain cepat & responsif
- **Framer Motion** - Animasi smooth dan modern
- **Axios** - HTTP client untuk komunikasi dengan backend
- **Google reCAPTCHA v2** - Validasi keamanan saat login

### Backend
- **Node.js** - Runtime JavaScript di server
- **Express.js** - Framework server-side routing
- **JWT (jsonwebtoken)** - Autentikasi dan otorisasi
- **bcrypt.js** - Enkripsi password
- **CORS Middleware** - Keamanan cross-origin
- **File System (fs)** - Simpan data user dalam `users.json`

### Hosting
- **Frontend:** Netlify  
- **Backend:** Railway

---

## 📁 Struktur Proyek

shark-rent-car/ ├── frontend/ │ ├── public/ │ ├── src/ │ │ ├── assets/ │ │ ├── components/ │ │ ├── pages/ │ │ ├── routes/ │ │ ├── App.jsx │ │ └── main.jsx │ └── tailwind.config.js │ └── backend/ ├── controllers/ ├── models/ ├── routes/ ├── middleware/ ├── server.js └── .env

yaml
Copy
Edit

---

## 🧪 Cara Menjalankan di Lokal

### 1. Clone Repository
```bash
git clone https://github.com/patihrz/shark-rent-car-frontend.git
git clone https://github.com/patihrz/shark-rent-car-backend.git
2. Jalankan Frontend
bash
Copy
Edit
cd shark-rent-car-frontend
npm install
npm run dev
3. Jalankan Backend
bash
Copy
Edit
cd shark-rent-car-backend
npm install
node server.js
Pastikan kamu sudah mengatur file .env dengan variabel berikut:
.env
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret

📬 Kontak & Kontribusi
👨‍💻 Patih Ramadika
Fullstack Developer & IT Support

🌐 LinkedIn (https://www.linkedin.com/in/patih-ramadika-19b763217/?originalSubdomain=id)

🐙 GitHub (https://github.com/patihrz/)

📜 Lisensi
Proyek ini dirilis di bawah lisensi MIT License
Silakan digunakan untuk keperluan pribadi, portfolio, atau pengembangan lebih lanjut 🙌

💡 Ingin Kontribusi?
Pull request sangat terbuka! Kamu bisa:

Menambahkan fitur baru

Memperbaiki bug

Menyempurnakan desain

Menambahkan dokumentasi
