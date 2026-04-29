import { create } from 'zustand';

export const useFavoriteStore = create((set) => ({
  favorites: [], // Array kosong buat nampung buku favorit awal
  
  addFavorite: (book) => set((state) => ({ 
    favorites: [...state.favorites, book] 
  })),
  
  removeFavorite: (bookKey) => set((state) => ({ 
    favorites: state.favorites.filter((item) => item.key !== bookKey) 
  })),
}));