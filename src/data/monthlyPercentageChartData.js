// src/data/monthlyPercentageChartData.js

const monthlyPercentageChartData = {
  // Data untuk periode yang ditampilkan di screenshot: Januari s.d 31 Oktober 2015
  // Ini adalah data yang Anda tunjukkan di screenshot image_0045b5.png dan image_0ce5f0.png
  "2025-07": { // Contoh data untuk Juli 2025 (sebagai bulan saat ini)
    labels: ['Pengaduan', 'Pertanyaan', 'Informasi'],
    datasets: [
      {
        data: [31, 8, 61], // Contoh persentase untuk Juli (sesuai image_0036b1.png)
        backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  },
  "2015-10": { // Contoh untuk data dari screenshot lama Anda (periode Jan-Okt 2015)
    labels: ['Pengaduan', 'Pertanyaan', 'Informasi'],
    datasets: [
      {
        data: [31, 8, 61], // Data ini diambil dari image_0ce5f0.png
        backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  },
  // ... Tambahkan data untuk bulan-bulan lain yang Anda butuhkan
  // Format: "YYYY-MM": { ... data chart ... }
};

export default monthlyPercentageChartData;