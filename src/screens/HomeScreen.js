import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, Text, View, FlatList, 
  ActivityIndicator, RefreshControl, TouchableOpacity 
} from 'react-native';
import { searchBooks } from '../api/openLibraryClient';
import { colors } from '../theme/colors'; // Palet warna andalan kita

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fungsi buat narik data
  const loadBooks = async () => {
    try {
      setError(null);
      // Buat default tampilan home, kita cari buku tentang 'design' atau bebas
      const data = await searchBooks('design'); 
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Jalanin fungsi narik data pas pertama kali screen dibuka
  useEffect(() => {
    loadBooks();
  }, []);

  // Logic buat pull-to-refresh (Requirement C.4)
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadBooks();
  }, []);

  // Komponen kecil buat nampilin tiap item buku
  const renderBookItem = ({ item }) => (
    // Nanti kalau di-klik bakal pindah ke DetailScreen bawa data bukunya
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { book: item })}
    >
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.author}>
        {item.author_name ? item.author_name[0] : 'Penulis Tidak Diketahui'}
      </Text>
    </TouchableOpacity>
  );

  // Requirement C.1: Loading Indicator
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 10 }}>Memuat buku...</Text>
      </View>
    );
  }

  // Requirement C.1: Error Handling
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
        contentContainerStyle={{ padding: 16 }}
        // Requirement C.4: Pull-to-refresh
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[colors.primary]} // Warna spinner loadingnya
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
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary, // Aksen Emerald Pine di pinggir card
    elevation: 2, // Shadow tipis buat Android
    shadowColor: '#000', // Shadow buat iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
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