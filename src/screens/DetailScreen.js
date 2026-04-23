import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useFavoriteStore } from '../store/useFavoriteStore';
import { colors } from '../theme/colors';

// Menerima 'route' buat ngambil params yang dikirim dari HomeScreen
const DetailScreen = ({ route }) => {
  // Tangkap data buku
  const { book } = route.params; 
  
  // Panggil state dan action dari Zustand
  const favorites = useFavoriteStore((state) => state.favorites);
  const addFavorite = useFavoriteStore((state) => state.addFavorite);
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);

  // Logic: Cek apakah buku ini udah ada di array favorites?
  const isFavorite = favorites.some((item) => item.key === book.key);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(book.key); // Kalau udah favorit, tombolnya jadi hapus
    } else {
      addFavorite(book); // Kalau belum, tambahin ke favorit
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {/* Field 1: Judul Utama */}
        <Text style={styles.title}>{book.title}</Text>
        
        {/* Requirement C.1: Minimal 5 Field Informasi Tambahan */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>2. Penulis:</Text>
          <Text style={styles.value}>
            {book.author_name ? book.author_name.join(', ') : 'Tidak diketahui'}
          </Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>3. Tahun Terbit Pertama:</Text>
          <Text style={styles.value}>{book.first_publish_year || '-'}</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>4. Jumlah Edisi:</Text>
          <Text style={styles.value}>{book.edition_count || '-'}</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>5. Penerbit:</Text>
          <Text style={styles.value}>
            {book.publisher ? book.publisher[0] : '-'}
          </Text>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>6. ID Buku:</Text>
          <Text style={styles.value}>{book.key}</Text>
        </View>
      </View>

      {/* Tombol Tambah ke Favorit (Requirement C.1) */}
      <TouchableOpacity 
        style={[styles.button, isFavorite && styles.buttonRemove]} 
        onPress={toggleFavorite}
      >
        <Text style={[styles.buttonText, isFavorite && styles.buttonTextRemove]}>
          {isFavorite ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
    borderTopWidth: 5,
    borderTopColor: colors.primary, // Aksen Emerald Pine
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 10,
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: colors.inactive,
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    flex: 2,
    textAlign: 'right',
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonRemove: {
    backgroundColor: colors.accent, // Kalau udah favorit, warnanya jadi Champagne Gold
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextRemove: {
    color: colors.primary, // Teksnya balik jadi gelap biar kontras sama Champagne Gold
  }
});