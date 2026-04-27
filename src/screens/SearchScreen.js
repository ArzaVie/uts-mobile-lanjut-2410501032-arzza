import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  FlatList, ActivityIndicator, Keyboard 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { searchBooks } from '../api/openLibraryClient';
import BookCard from '../components/BookCard';
import { colors } from '../theme/colors';

const SearchScreen = ({ navigation }) => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // State tambahan buat nyimpen history pencarian (Biar persis kayak di gambar)
  const [recentSearches, setRecentSearches] = useState([
    'Atomic Habbit', 
    'Pulang', 
    'React Native',
  ]);

  const handleSearch = async (searchKeyword = keyword) => {
    const textToSearch = searchKeyword.trim();

    // Validasi Client-Side
    if (!textToSearch) {
      setErrorMsg('Pencarian tidak boleh kosong!');
      return;
    }
    if (textToSearch.length < 3) {
      setErrorMsg('Minimal masukkan 3 karakter!');
      return;
    }

    setErrorMsg('');
    setLoading(true);
    Keyboard.dismiss();

    try {
      const data = await searchBooks(textToSearch);
      setResults(data);
      if (data.length === 0) {
        setErrorMsg('Buku tidak ditemukan.');
      } else {
        // Kalau berhasil, tambahin ke recent searches (cegah duplikat)
        if (!recentSearches.includes(textToSearch)) {
          setRecentSearches([textToSearch, ...recentSearches].slice(0, 5)); // Simpan 5 history aja
        }
      }
    } catch (err) {
      setErrorMsg('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const removeRecent = (itemToRemove) => {
    setRecentSearches(recentSearches.filter(item => item !== itemToRemove));
  };

  const renderBookItem = ({ item }) => (
    <BookCard 
      book={item} 
      onPress={() => navigation.navigate('Home', { screen: 'Detail', params: { book: item }})} 
    />
  );

  // Kondisi buat nampilin section "Recent Searches"
  const showRecent = results.length === 0 && !loading && !errorMsg;

  return (
    <View style={styles.container}>
      
      {/* CARD SEARCH BAR BERSATU SAMA RECENT SEARCHES */}
      <View style={[styles.searchCard, showRecent && styles.searchCardExpanded]}>
        
        {/* Row Input Pencarian */}
        <View style={styles.searchInputRow}>
          <Feather name="search" size={20} color={colors.primary} style={styles.iconLeft} />
          <TextInput
            style={styles.input}
            placeholder="Cari buku..."
            placeholderTextColor={colors.inactive}
            value={keyword}
            onChangeText={(text) => {
              setKeyword(text);
              setErrorMsg('');
              if (text === '') setResults([]); // Reset hasil kalau text dihapus
            }}
            onSubmitEditing={() => handleSearch(keyword)}
            returnKeyType="search"
          />
          
          {/* Tombol Submit (Pengganti icon Mic di gambar biar sesuai syarat UTS) */}
          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={() => handleSearch(keyword)}
          >
            <Feather name={keyword ? "arrow-right" : "mic"} size={20} color={colors.inactive} />
          </TouchableOpacity>
        </View>

        {/* Section Recent Searches (Muncul kalau belum ada hasil) */}
        {showRecent && recentSearches.length > 0 && (
          <View style={styles.recentSection}>
            <Text style={styles.recentTitle}>Recent Searches</Text>
            
            {recentSearches.map((item, index) => (
              <View key={index} style={styles.recentItemRow}>
                {/* Kalau history diklik, langsung cari buku itu */}
                <TouchableOpacity 
                  style={styles.recentItemTextContainer}
                  onPress={() => {
                    setKeyword(item);
                    handleSearch(item);
                  }}
                >
                  <Feather name="search" size={16} color={colors.inactive} />
                  <Text style={styles.recentItemText}>{item}</Text>
                </TouchableOpacity>
                
                {/* Tombol X buat hapus history */}
                <TouchableOpacity onPress={() => removeRecent(item)} style={styles.removeRecentBtn}>
                  <Feather name="x" size={16} color={colors.inactive} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* PESAN ERROR VALIDASI */}
      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

      {/* HASIL PENCARIAN */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Mencari buku...</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.key}
          renderItem={renderBookItem}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background,
  },
  searchCard: {
    backgroundColor: colors.surface,
    margin: 16,
    borderRadius: 16,
    elevation: 4, // Shadow buat Android
    shadowColor: '#000', // Shadow buat iOS
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 4 },
  },
  searchCardExpanded: {
    paddingBottom: 16, // Kasih ruang bawah pas Recent Searches muncul
  },
  searchInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
  },
  iconLeft: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    height: '100%',
  },
  submitButton: {
    padding: 8,
  },
  recentSection: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  recentTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 12,
  },
  recentItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  recentItemTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recentItemText: {
    marginLeft: 12,
    fontSize: 15,
    color: colors.inactive,
  },
  removeRecentBtn: {
    padding: 4,
  },
  errorText: { 
    color: colors.danger, 
    textAlign: 'center', 
    marginTop: 8, 
    fontWeight: '600',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: colors.inactive,
    fontSize: 14,
  },
  listContainer: { 
    padding: 16, 
    paddingBottom: 40 
  },
  columnWrapper: { 
    justifyContent: 'space-between' 
  }
});