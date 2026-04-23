import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SearchScreen from '../screens/SearchScreen';
import AboutScreen from '../screens/AboutScreen';

// Import warna personal lu (opsional kalau file colors.js udah dibikin)
import { colors } from '../theme/colors'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 1. Bikin Stack buat Home -> Detail
// Kenapa dipisah? Biar pas buka Detail Buku, Bottom Tab-nya bisa disembunyiin atau tetep ada sesuai selera.
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: colors.primary }}>
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
        options={{ title: 'BookShelf' }} 
      />
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen} 
        options={{ title: 'Detail Buku' }} 
      />
    </Stack.Navigator>
  );
};

// 2. Bikin Bottom Tabs sebagai navigasi utama
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.accent, // Warna Champagne Gold pas tab aktif
        tabBarInactiveTintColor: colors.inactive,
        tabBarStyle: {
          backgroundColor: colors.primary, // Background Emerald Pine buat bar bawah
          paddingBottom: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.background,
      }}
    >
      {/* Tab Home ini manggil Stack yang udah kita bikin di atas */}
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={{ headerShown: false, tabBarLabel: 'Beranda' }} 
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ title: 'Cari Buku', tabBarLabel: 'Cari' }} 
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{ title: 'Buku Favorit', tabBarLabel: 'Favorit' }} 
      />
      <Tab.Screen 
        name="About" 
        component={AboutScreen} 
        options={{ title: 'Tentang Saya', tabBarLabel: 'Profil' }} 
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;