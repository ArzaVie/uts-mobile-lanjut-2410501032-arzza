import axios from 'axios';

// Bikin instance axios biar gampang kalau mau ditambahin config lain
const apiClient = axios.create({
  baseURL: 'https://openlibrary.org',
  timeout: 10000, // Timeout 10 detik biar kalau inet lemot langsung masuk ke error handling
});

export const searchBooks = async (query = 'technology') => {
  try {
    // Panggil endpoint search dari openlibrary, limit 10 aja dulu biar ringan
    const response = await apiClient.get(`/search.json?q=${query}&limit=10`);
    return response.data.docs;
  } catch (error) {
    // Lempar error biar ditangkap sama komponen HomeScreen
    throw new Error('Gagal mengambil data buku. Cek koneksi internet lu.');
  }
};