import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Keyboard } from 'react-native';
import { searchBooks } from '../api/openLibraryClient';
import BookCard from '../components/BookCard';
import { colors } from '../theme/colors';

const SearchScreen = ({ navigation }) => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async () => {
    // Validasi Client-Side (Requirement C.1)
    if (!keyword.trim()) {
      setErrorMsg('Pencarian tidak boleh kosong!');
      return;
    }
    if (keyword.trim().length < 3) {
      setErrorMsg('Minimal masukkan 3 karakter!');
      return;
    }

    // Kalau validasi lolos, baru narik data
    setErrorMsg('');
    setLoading(true);
    Keyboard.dismiss(); // Tutup keyboard pas mulai nyari

    try {
      const data = await searchBooks(keyword);
      setResults(data);
      if (data.length === 0) {
        setErrorMsg('Buku tidak ditemukan.');
      }
    } catch (err) {
      setErrorMsg('Gagal mencari buku. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const renderBookItem = ({ item }) => (
    <BookCard 
      book={item} 
      onPress={() => navigation.navigate('Home', { screen: 'Detail', params: { book: item }})} 
    />
  );

  return (
    <View style={styles.container}>
      {/* Form Pencarian */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cari judul buku..."
          value={keyword}
          onChangeText={(text) => {
            setKeyword(text);
            setErrorMsg(''); // Hapus error kalau user mulai ngetik lagi
          }}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Cari</Text>
        </TouchableOpacity>
      </View>

      {/* Menampilkan pesan error validasi */}
      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

      {/* Menampilkan hasil pencarian */}
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.key}
          renderItem={renderBookItem}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  searchContainer: { flexDirection: 'row', padding: 16, backgroundColor: '#FFF', elevation: 2 },
  input: { flex: 1, borderWidth: 1, borderColor: '#CBD5E0', borderRadius: 8, paddingHorizontal: 12, marginRight: 8, height: 44 },
  searchButton: { backgroundColor: colors.primary, paddingHorizontal: 16, justifyContent: 'center', borderRadius: 8 },
  searchButtonText: { color: '#FFF', fontWeight: 'bold' },
  errorText: { color: colors.danger, textAlign: 'center', marginTop: 10, fontWeight: 'bold' },
  listContainer: { padding: 16, paddingBottom: 40 },
  columnWrapper: { justifyContent: 'space-between' }
});