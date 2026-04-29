# BookShelf - Project UTS Pemrograman Mobile Lanjut

**BookShelf** adalah aplikasi mobile berbasis React Native dan Expo yang berfungsi sebagai katalog perpustakaan digital modern. Terintegrasi secara *real-time* dengan publik API OpenLibrary, aplikasi ini dirancang dengan antarmuka (UI/UX) yang minimalis dan elegan. 

Melalui BookShelf, pengguna dapat dengan mudah mengeksplorasi jajaran buku *trending*, mencari literatur spesifik, melihat detail sinopsis, serta mengelola daftar bacaan pribadi melalui fitur Favorit yang didukung oleh *state management* yang cepat dan efisien.

---

## Identitas Pengembang

- **Nama**  : Arzza Munabim
- **NIM**   : 2410501032
- **Kelas** : Pemrograman Mobile Lanjut - B
- **Tema**  :  BookShelf - Katalog Buku

---

## Tech Stack

Aplikasi ini dibangun menggunakan ekosistem JavaScript modern:

- **Framework**: [React Native 0.81](https://reactnative.dev/) ([Expo SDK 54](https://docs.expo.dev/))
- **Core Library**: [React 19](https://react.dev/)
- **Navigation**: [React Navigation 7](https://reactnavigation.org/) (Native Stack & Bottom Tabs) 
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (Untuk manajemen *state* global pada fitur Favorit)
- **HTTP Client**: [Axios](https://axios-http.com/) (Untuk *fetching* data dengan konfigurasi *timeout* khusus)
- **UI & Styling**: 
  - [Expo Google Fonts](https://github.com/expo/google-fonts) (Menggunakan *Plus Jakarta Sans* untuk tipografi modern)
  - [@expo/vector-icons](https://icons.expo.fyi/) (Menggunakan *icon set* Feather yang konsisten)
---

## Cara Run Project

Pastikan Anda sudah menginstall Node.js dan aplikasi Expo Go di smartphone.

1.  **Clone Repository**
    ```bash
    git clone 
    
    ```
2.  **Install Dependencies**
    ```bash
    npm install
    ```
3.  **Run Metro Bundler**
    ```bash
    npx expo start -c
    ```
4.  **Scan QR Code**: Buka aplikasi **Expo Go** di Android/iOS dan scan QR Code yang muncul di terminal.

---

## Screenshots

| Home                             | Detail Screen                        | Browse                               | Favorites                           | About Us                             |
| -------------------------------- | ------------------------------------ | ------------------------------------ | ----------------------------------- | ------------------------------------ |
| ![Home](#home) | ![Detail](#detail) | ![Seacrh](#seacrh) | ![Fav](#favorite) | ![About](#profile) |

---

## Video Demo

- [Klik di sini untuk menonton Video Demo Aplikasi (Youtube)]()
---

## Penjelasan State Management
Pada proyek ini, saya memilih menggunakan **Zustand** sebagai *State Management* utama untuk mengelola data Buku Favorit. Alasan utama pemilihan Zustand dibandingkan Redux Toolkit adalah ukuran *bundle*-nya yang jauh lebih ringan dan *boilerplate* kode yang sangat minim, sehingga mempercepat proses pengembangan aplikasi. Selain itu, Zustand memberikan fleksibilitas tinggi karena tidak membutuhkan konfigurasi pembungkus `<Provider>` yang rumit seperti Context API, yang sering kali memicu masalah *provider hell*. Dengan arsitektur ini, *store* Zustand dapat langsung diimpor dan digunakan secara praktis di berbagai layar. Sebagai contoh, *store* ini dipanggil di `DetailScreen` untuk memicu aksi penambahan buku, di `FavoritesScreen` untuk merender daftar buku yang tersimpan, dan di `AboutScreen` untuk menampilkan statistik jumlah buku favorit secara *real-time*. Dari segi performa, Zustand terbukti sangat efisien karena mampu menangani *re-rendering* komponen secara spesifik hanya pada bagian data yang mengalami perubahan, sehingga interaksi pengguna saat menambah atau menghapus buku dari daftar favorit tetap terasa mulus tanpa mengorbankan performa aplikasi.
---

## Referensi

- [React Navigation Docs](https://reactnavigation.org/docs/getting-started) untuk struktur navigasi.
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started) - Untuk referensi struktur navigasi *Stack* dan *Bottom Tabs*.
- [Open Library API Documentation](https://openlibrary.org/developers/api) - Referensi struktur *endpoint* untuk fitur *Search*, *Works* (Detail), dan *Trending Books*.
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction) - Panduan implementasi *state management* global.
- [Axios Configuration](https://axios-http.com/docs/req_config) - Referensi penanganan *timeout* (batas waktu *loading*) dan *error handling* untuk API publik.
- [Expo Google Fonts](https://docs.expo.dev/guides/using-custom-fonts/) - Cara menginstal, memuat, dan menggunakan *custom font* (Plus Jakarta Sans) di ekosistem Expo
---

## Refleksi
