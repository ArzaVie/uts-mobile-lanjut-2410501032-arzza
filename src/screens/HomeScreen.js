import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, Text, View, FlatList, 
  ActivityIndicator, RefreshControl, TouchableOpacity,
  Image, Dimensions
} from 'react-native';
import { searchBooks } from '../api/openLibraryClient';
import { colors } from '../theme/colors';
import BookCard from '../components/BookCard';
import { getTrendingBooks } from '../api/openLibraryClient';

// Ambil ukuran layar biar ukuran card-nya presisi dibagi 2 kolom
const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 48) / numColumns; // 48 dari padding kiri-kanan dan jarak antar card

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadBooks = async () => {
    try {
      setError(null);
      const data = await getTrendingBooks();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadBooks();
  }, []);

  const renderBookItem = ({ item }) => {
    return (
      <BookCard 
        book={item} 
        onPress={() => navigation.navigate('Detail', { book: item })}
      />
    );
      <TouchableOpacity 
        style={[styles.card, { width: cardWidth }]}
        onPress={() => navigation.navigate('Detail', { book: item })}
      >
        <Image 
          source={{ uri: coverUrl }} 
          style={styles.coverImage} 
          resizeMode="cover" // Biar gambarnya proporsional memenuhi kotak
        />
        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.author} numberOfLines={1}>
            {item.author_name ? item.author_name[0] : 'Anonim'}
          </Text>
        </View>
      </TouchableOpacity>
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 10 }}>Menyusun rak buku...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadBooks}>
          <Text style={styles.retryText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.key}
        renderItem={renderBookItem}
        numColumns={numColumns} // Ini yang bikin layoutnya jadi grid 2 kolom
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper} // Biar jarak antar kolom seimbang
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[colors.primary]} 
          />
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContainer: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16, // Jarak baris atas dan bawah
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden', // Biar sudut gambar ikut melengkung ngikutin card
    elevation: 4, 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  coverImage: {
    width: '100%',
    height: 180, // Tinggi cover bukunya
    backgroundColor: '#E2E8F0', // Warna background sementara pas gambar lagi loading
  },
  cardContent: {
    padding: 12,
    borderTopWidth: 2,
    borderTopColor: colors.accent, // Aksen garis Champagne Gold misahin gambar & teks
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
    minHeight: 40, // Biar judul yang panjang/pendek tinggi card-nya tetep sama
  },
  author: {
    fontSize: 12,
    color: colors.inactive,
  },
  errorText: {
    color: colors.danger,
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  retryText: {
    color: colors.background,
    fontWeight: 'bold',
  }
});