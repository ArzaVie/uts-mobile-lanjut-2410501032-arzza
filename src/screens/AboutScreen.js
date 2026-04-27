import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { colors } from '../theme/colors';

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        {/* Placeholder Foto Profil - Nanti lu bisa ganti require('./path-ke-foto-lu.jpg') */}
        <Image 
          source={{ uri: 'https://via.placeholder.com/150' }} 
          style={styles.avatar} 
        />
        <Text style={styles.name}>Arzza Munabim</Text>
        <Text style={styles.nim}>NIM: 2410501032</Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Kelas: D3 Sistem Informasi (Angkatan 2024)</Text>
          <Text style={styles.infoText}>Kampus: UPN "Veteran" Jakarta</Text>
          <Text style={styles.infoText}>Tema Project: Tema C - BookShelf</Text>
        </View>
      </View>

      <View style={styles.creditCard}>
        <Text style={styles.creditTitle}>Credit API</Text>
        <Text style={styles.creditText}>
          Aplikasi ini menggunakan layanan data publik dari Open Library API (https://openlibrary.org) untuk mengambil metadata dan sampul buku.
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 20,
    alignItems: 'center',
  },
  profileCard: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
    borderTopWidth: 6,
    borderTopColor: colors.primary,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: colors.accent,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  nim: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoBox: {
    width: '100%',
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  creditCard: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  creditTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  creditText: {
    fontSize: 14,
    color: colors.inactive,
    lineHeight: 20,
  }
});