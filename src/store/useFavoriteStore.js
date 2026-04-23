import { create } from 'zustand';

// Bikin store buat nyimpen state global
export const useFavoriteStore = create((set) => ({
  favorites: [], // Array kosong buat nampung buku favorit awal
  
  // Fungsi buat nambahin buku ke favorit
  addFavorite: (book) => set((state) => ({ 
    favorites: [...state.favorites, book] 
  })),
  
  // Fungsi buat ngehapus buku dari favorit berdasarkan 'key' (ID buku)
  removeFavorite: (bookKey) => set((state) => ({ 
    favorites: state.favorites.filter((item) => item.key !== bookKey) 
  })),
}));