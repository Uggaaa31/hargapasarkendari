// src/data/monthlyCommodityChartData.js

const monthlyCommodityChartData = {
  // Data untuk periode yang ditampilkan di screenshot: Januari s.d 31 Oktober 2015
  // Ini adalah data yang Anda tunjukkan di screenshot image_0045b5.png dan image_0ce5f0.png
  // Karena periode Anda adalah "Januari s.d 31 Oktober 2015", ini adalah data gabungan 10 bulan.
  // Untuk simulasi "data per bulan" yang otomatis ganti, saya akan membuat data untuk bulan Juli 2025 (bulan saat ini)
  // dan data lama yang Anda berikan sebagai contoh untuk "Januari - Oktober 2015" yang bisa Anda pakai jika Anda mau simulasi data lama.

  // Contoh data untuk bulan Juli 2025 (sebagai bulan saat ini, jika waktu sistem Anda Juli)
  "2025-07": {
    labels: [
      'Pembiayaan', 'Perbankan', 'Elektronik', 'Perumahan/Property',
      'Telekomunikasi', 'E Commerce', 'Transportasi', 'Jasa Perbankan', 'Lain-lain'
    ],
    datasets: [
      {
        label: 'Jumlah Kasus',
        data: [35, 7, 20, 2, 5, 45, 15, 10, 8], // Contoh data untuk Juli 2025 (sesuai proporsi image_0036b1.png)
        backgroundColor: [
            '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#36A2EB', '#FF9F40',
            '#8E44AD', '#2ECC71', '#E74C3C'
        ],
        borderColor: 'rgba(255,255,255,0.8)',
        borderWidth: 1,
      },
    ],
  },
  // Data lama dari screenshot (jika ingin disimulasikan untuk periode lain, misal 2015-10 untuk Oktober)
  // Anda harus membuat ini menjadi data bulanan individual jika ingin switch antar bulan di masa lalu.
  "2015-10": { // Contoh untuk data dari screenshot lama Anda (periode Jan-Okt 2015)
    labels: [
      'Pembiayaan', 'Perbankan', 'Elektronik', 'Perumahan/Property',
      'Telekomunikasi', 'Lain-lain', 'E Commerce', 'Transportasi', 'Jasa Perbankan'
    ],
    datasets: [
      {
        label: 'Jumlah Kasus',
        data: [35, 7, 20, 2, 5, 45, 0, 0, 0], // Data ini diambil dari image_0ce5f0.png, sesuaikan jika ada data E-Commerce dll.
        backgroundColor: [
            '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#36A2EB', '#FF9F40',
            '#8E44AD', '#2ECC71', '#E74C3C'
        ],
        borderColor: 'rgba(255,255,255,0.8)',
        borderWidth: 1,
      },
    ],
  },
  // ... Tambahkan data untuk bulan-bulan lain yang Anda butuhkan
  // Format: "YYYY-MM": { ... data chart ... }
};

export default monthlyCommodityChartData;