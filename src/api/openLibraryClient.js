import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://openlibrary.org',
  timeout: 30000, 
});

export const searchBooks = async (query = 'technology') => {
  try {
    const response = await apiClient.get(`/search.json?q=${query}&limit=100`);
    return response.data.docs;
  } catch (error) {
    throw new Error('Gagal memuat data');
  }
};

export const getTrendingBooks = async () => {
  try {
    console.log("Mencoba fetch API Trending...");
    const response = await apiClient.get('/trending/daily.json?limit=100');
    console.log("Berhasil dapat data! Jumlah buku:", response.data.works?.length);  
    return response.data.works; 
  } catch (error) {
    console.error("Ini error aslinya Bang:", error.message); 
    
    throw new Error('Gagal memuat data'); 
  }
};