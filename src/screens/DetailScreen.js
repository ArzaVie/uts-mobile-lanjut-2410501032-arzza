import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, 
  Image, ActivityIndicator, Share 
} from 'react-native';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import { useFavoriteStore } from '../store/useFavoriteStore';
import { colors } from '../theme/colors';

const DetailScreen = ({ route }) => {
  // Tangkap data awal buku dari HomeScreen
  const { book } = route.params; 
  
  // State buat nyimpen deskripsi dari API /works
  const [description, setDescription] = useState('');
  const [loadingDesc, setLoadingDesc] = useState(true);

  const favorites = useFavoriteStore((state) => state.favorites);
  const addFavorite = useFavoriteStore((state) => state.addFavorite);
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);

  const isFavorite = favorites.some((item) => item.key === book.key);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org${book.key}.json`);
        const descData = response.data.description;
        
        if (typeof descData === 'string') {
          setDescription(descData);
        } else if (descData && descData.value) {
          setDescription(descData.value);
        } else {
          setDescription('Deskripsi tidak tersedia untuk buku ini.');
        }
      } catch (error) {
        setDescription('Gagal memuat deskripsi.');
      } finally {
        setLoadingDesc(false);
      }
    };

    fetchBookDetails();
  }, [book.key]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(book.key);
    } else {
      addFavorite(book);
    }
  };

  const shareBook = async () => {
    try {
      await Share.share({
        message: `Cek buku keren ini: ${book.title} karya ${book.author_name ? book.author_name[0] : 'Anonim'}. Temukan di aplikasi BookShelf!`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Siapin URL Cover resolusi L (Large)
  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` 
    : 'https://via.placeholder.com/300x450.png?text=No+Cover';

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      
      {/* 1. INFORMASI UTAMA & SAMPUL */}
      <View style={styles.headerSection}>
        <Image source={{ uri: coverUrl }} style={styles.coverImage} resizeMode="cover" />
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author_name ? book.author_name.join(', ') : 'Penulis Tidak Diketahui'}</Text>
      </View>

      {/* 5. TINDAKAN (ACTIONS) */}
      <View style={styles.actionSection}>
        <TouchableOpacity 
          style={[styles.actionButton, isFavorite && styles.actionButtonActive]} 
          onPress={toggleFavorite}
          activeOpacity={0.8}
        >
          <Feather name="heart" size={20} color={isFavorite ? colors.surface : colors.primary} />
          <Text style={[styles.actionText, isFavorite && styles.actionTextActive]}>
            {isFavorite ? 'Favorit' : 'Tambah Favorit'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={shareBook} activeOpacity={0.8}>
          <Feather name="share-2" size={20} color={colors.primary} />
          <Text style={styles.actionText}>Bagikan</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* 2. DESKRIPSI BUKU */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sinopsis</Text>
        {loadingDesc ? (
          <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: 10, alignSelf: 'flex-start' }} />
        ) : (
          <Text style={styles.descriptionText}>{description}</Text>
        )}
      </View>

      <View style={styles.divider} />

      {/* 3. INFORMASI DETAIL (Identitas Tambahan) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informasi Buku</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tahun Terbit</Text>
          <Text style={styles.infoValue}>{book.first_publish_year || 'Tidak diketahui'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Penerbit</Text>
          <Text style={styles.infoValue}>
            {book.publisher ? book.publisher[0] : 'Tidak diketahui'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>ISBN</Text>
          <Text style={styles.infoValue}>
            {book.isbn ? book.isbn[0] : 'Tidak tersedia'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Jumlah Edisi</Text>
          <Text style={styles.infoValue}>{book.edition_count || '-'} edisi</Text>
        </View>
      </View>

    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  headerSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  coverImage: {
    width: 160,
    height: 240,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 28,
  },
  author: {
    fontSize: 16,
    color: colors.inactive,
    textAlign: 'center',
    fontWeight: '500',
  },
  actionSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 16, // Jarak antar tombol
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30, // Bentuk pil ala modern UI
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  actionTextActive: {
    color: colors.surface,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 24,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24, // Jarak baca yang nyaman
    textAlign: 'justify',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.inactive,
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    flex: 2,
    textAlign: 'right',
  },
});