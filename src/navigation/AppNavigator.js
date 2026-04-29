import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'; 

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
        headerShadowVisible: false, // Ngilangin bayangan bawaan header Stack
        headerTitleAlign: 'center', // Bikin judul selalu di tengah
        headerTitleStyle: {
          fontFamily: 'Jakarta-SemiBold', // Pastikan font ini udah di-load di App.js
          fontWeight: '700',
          fontSize: 16, // Ukuran font dibikin lebih proporsional dan elegan
          letterSpacing: 0.5,
        }
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
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Search') iconName = 'search';
          else if (route.name === 'Favorites') iconName = 'bookmark'; 
          else if (route.name === 'About') iconName = 'user';

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary, 
        tabBarInactiveTintColor: colors.inactive,
        tabBarStyle: {
          fontFamily: 'Jakarta-Medium',
          backgroundColor: colors.surface, 
          borderTopWidth: 1,
          borderTopColor: colors.border, 
          elevation: 0, 
          shadowOpacity: 0, 
          paddingBottom: 5,
          paddingTop: 5, 
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
        headerTitleAlign: 'center', 
        headerTitleStyle: {
          fontFamily: 'Jakarta-Bold',
          fontWeight: '700',
          fontSize: 16,
          letterSpacing: 0.5,
        }
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