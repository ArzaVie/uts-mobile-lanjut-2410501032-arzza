import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'; // Import icon Feather yang minimalis

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SearchScreen from '../screens/SearchScreen';
import AboutScreen from '../screens/AboutScreen';

import { colors } from '../theme/colors'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 1. Stack buat Home -> Detail
const HomeStack = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerTintColor: colors.primary,
        headerStyle: { backgroundColor: colors.surface },
        headerShadowVisible: false, 
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'BookShelf' }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail Buku' }} />
    </Stack.Navigator>
  );
};

// 2. Bottom Tabs sebagai navigasi utama
const AppNavigator = () => {
  return (
    <Tab.Navigator
      // Kita pakai route buat ngecek lagi di tab mana buat nentuin icon-nya
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Mapping nama tab dengan nama icon dari Feather
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Favorites') {
            iconName = 'heart'; // Pakai 'heart' atau bisa juga 'bookmark'
          } else if (route.name === 'About') {
            iconName = 'user';
          }

          // Render icon-nya di sini
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary, 
        tabBarInactiveTintColor: colors.inactive,
        tabBarStyle: {
          backgroundColor: colors.surface, 
          borderTopWidth: 1,
          borderTopColor: colors.border, 
          elevation: 0, 
          shadowOpacity: 0, 
          paddingBottom: 5,
          paddingTop: 5, // Tambahin padding atas dikit biar icon ga mepet
          height: 60,
        },
        headerStyle: {
          backgroundColor: colors.surface, 
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border, 
        },
        headerTintColor: colors.primary, 
      })}
    >
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
        options={{ title: 'Profil Saya', tabBarLabel: 'Profil' }} 
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;