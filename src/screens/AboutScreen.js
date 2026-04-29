import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFavoriteStore } from '../store/useFavoriteStore'; // Ambil data favorit buat statistik
import { colors } from '../theme/colors';

const AboutScreen = () => {
  const navigation = useNavigation();
  
  const totalFavorites = useFavoriteStore((state) => state.favorites.length);

  const handleDummyPress = () => {
    Alert.alert("Fitur Segera Hadir", "Fitur Catatan & Highlight akan tersedia di versi berikutnya.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* 1. INFORMASI DASAR PENGGUNA */}
      <View style={styles.header}>
        <Image 
          source={{ uri: '#' }} // Ganti pakai foto lu
          style={styles.avatar} 
        />
        <Text style={styles.name}>Arzza Munabim</Text>
        <Text style={styles.bio}>Mahasiswa • D3 Sistem Informasi</Text>
        <Text style={styles.email}>2410501032@mahasiswa.upnvj.ac.id</Text>
      </View>

      {/* 2. AKTIVITAS & STATISTIK MEMBACA */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{totalFavorites}</Text>
          <Text style={styles.statLabel}>Disimpan</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statValue}>14j</Text>
          <Text style={styles.statLabel}>Waktu Baca</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statValue}>5/12</Text>
          <Text style={styles.statLabel}>Target Buku</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        
        {/* 3. BOOKMARK, CATATAN & HIGHLIGHT */}
        <Text style={styles.sectionTitle}>Perpustakaan Saya</Text>
        
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => navigation.navigate('Favorites')} // Beneran pindah ke halaman Favorit
          activeOpacity={0.7}
        >
          <View style={styles.menuIconBox}>
            <Feather name="bookmark" size={18} color={colors.surface} />
          </View>
          <Text style={styles.menuText}>Bookmark & Favorit</Text>
          <Feather name="chevron-right" size={20} color={colors.inactive} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={handleDummyPress} 
          activeOpacity={0.7}
        >
          <View style={[styles.menuIconBox, { backgroundColor: '#F59E0B' }]}>
            <Feather name="edit-3" size={18} color={colors.surface} />
          </View>
          <Text style={styles.menuText}>Catatan & Highlight</Text>
          <Feather name="chevron-right" size={20} color={colors.inactive} />
        </TouchableOpacity>

        {/* 4. INFO AKADEMIK (WAJIB BUAT UTS) */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Informasi Sistem (UTS)</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Feather name="box" size={16} color={colors.inactive} />
            <Text style={styles.infoLabel}>Tema Project</Text>
            <Text style={styles.infoValue}>Tema C - BookShelf</Text>
          </View>
          
          <View style={[styles.infoRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <Feather name="database" size={16} color={colors.inactive} />
            <Text style={styles.infoLabel}>Credit API</Text>
            <Text style={styles.infoValue}>openlibrary.org</Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.border,
  },
  name: {
    fontFamily: 'Jakarta-Bold',
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  bio: {
    fontFamily: 'Jakarta-Medium',
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    fontSize: 13,
    color: colors.inactive,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 16,
    paddingVertical: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.inactive,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.inactive,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.inactive,
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});