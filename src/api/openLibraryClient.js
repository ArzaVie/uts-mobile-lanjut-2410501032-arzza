import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://openlibrary.org',
  // NAIKKIN TIMEOUT JADI 30 DETIK (30000 ms) biar sabar nungguin API gratisan
  timeout: 30000, 
});

export const searchBooks = async (query = 'technology') => {
  try {
    const response = await apiClient.get(`/search.json?q=${query}&limit=10`);
    return response.data.docs;
  } catch (error) {
    throw new Error('Gagal memuat data');
  }
};

export const getTrendingBooks = async () => {
  try {
    console.log("Mencoba fetch API Trending..."); // Buat ngecek di terminal
    const response = await apiClient.get('/trending/daily.json?limit=10');
    console.log("Berhasil dapat data! Jumlah buku:", response.data.works?.length); // Buat mastiin datanya ada
    return response.data.works; 
  } catch (error) {
    // INI PENTING: Biar lu bisa liat error aslinya di terminal VSCode/CMD lu
    console.error("Ini error aslinya Bang:", error.message); 
    
    // Tapi yang ditampilin ke dosen di layar HP tetep "Gagal memuat data"
    throw new Error('Gagal memuat data'); 
  }
};