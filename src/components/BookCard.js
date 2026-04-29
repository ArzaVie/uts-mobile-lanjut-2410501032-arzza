import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { colors } from '../theme/colors';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 48) / numColumns;

const BookCard = ({ book, onPress, children }) => {
  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` 
    : 'https://via.placeholder.com/150x220.png?text=No+Cover';

  return (
    <View style={[styles.cardContainer, { width: cardWidth }]}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
        {/* Gambar dibikin sedikit lebih tinggi biar proporsional kayak poster film/buku asli */}
        <Image source={{ uri: coverUrl }} style={styles.coverImage} />
        
        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
          <Text style={styles.author} numberOfLines={1}>
            {book.author_name ? book.author_name[0] : 'Anonim'}
          </Text>
        </View>
      </TouchableOpacity>
      {children}
    </View>
  );
};

export default BookCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20, 
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 8, 
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 1, 
    shadowColor: '#000', 
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  coverImage: {
    width: '100%',
    height: 210, 
    backgroundColor: colors.border,
  },
  cardContent: {
    padding: 12,
    paddingTop: 14,
  },
  title: {
    fontSize: 14,
    fontWeight: '700', 
    color: colors.primary,
    marginBottom: 4,
    minHeight: 38,
    lineHeight: 18, //
  },
  author: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.inactive,
    letterSpacing: 0.3, 
  },
});