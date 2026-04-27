import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFavoriteStore } from '../store/useFavoriteStore';
import BookCard from '../components/BookCard';
import { colors } from '../theme/colors';

const FavoritesScreen = ({ navigation }) => {
  const favorites = useFavoriteStore((state) => state.favorites);
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Belum ada buku favorit nih.</Text>
        <Text style={styles.subText}>Cari buku favoritmu di Beranda!</Text>
      </View>
    );
  }

  const renderFavoriteItem = ({ item }) => (
    // Panggil Reusable Component BookCard
    <BookCard 
      book={item} 
      onPress={() => navigation.navigate('Home', { screen: 'Detail', params: { book: item }})}
    >
      {/* Tombol Hapus diselipin di bawah card */}
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => removeFavorite(item.key)}
      >
        <Text style={styles.deleteText}>Hapus dari Favorit</Text>
      </TouchableOpacity>
    </BookCard>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.key}
        renderItem={renderFavoriteItem}
        numColumns={2} // Grid 2 kolom
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: colors.primary, marginBottom: 8 },
  subText: { fontSize: 14, color: colors.inactive },
  deleteButton: {
    backgroundColor: colors.danger,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginTop: -2, // Biar nempel mulus sama bagian bawah card
  },
  deleteText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' }
});