// src/utils/slugify.js
export default function slugify(str) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // hapus karakter aneh
      .trim()
      .replace(/\s+/g, '-'); // ganti spasi jadi strip
  }
  