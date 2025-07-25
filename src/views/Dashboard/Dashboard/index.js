// src/views/Dashboard/Dashboard/index.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios'; // Tidak perlu diimpor untuk UI Only

// Impor komponen spesifik dashboard
import HargaPokokSummaryCard from './components/HargaPokokSummaryCard';
import ComplaintStatsCard from './components/ComplaintStatsCard';
import PengawasanStatusCard from './components/PengawasanStatusCard';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api'; // Tidak perlu untuk UI Only

const Dashboard = () => {
  // State untuk menyimpan data dummy
  const [hargaPokokSummary, setHargaPokokSummary] = useState(null);
  const [complaintStats, setComplaintStats] = useState(null);
  const [pengawasanSummary, setPengawasanSummary] = useState(null);
  const [loading, setLoading] = useState(true); // Mulai dengan loading true untuk simulasi
  const [error, setError] = useState(null); // Bisa digunakan untuk simulasi error

  useEffect(() => {
    // --- SIMULASI PENGAMBILAN DATA (UI ONLY) ---
    // Di sini Anda akan mengganti dengan panggilan API yang sebenarnya nanti
    const simulateFetch = () => {
      setTimeout(() => {
        setHargaPokokSummary({
          average_price: 18500,
          // Tambahkan data dummy lain yang mungkin dibutuhkan oleh card
        });
        setComplaintStats({
          total_complaints: 125,
          new_complaints: 5,
          in_progress_complaints: 12,
          resolved_complaints: 108,
          // Tambahkan data dummy lain yang mungkin dibutuhkan oleh card
        });
        setPengawasanSummary({
          active_supervisions: 7,
          pending_reviews: 3,
          completed_today: 1,
          // Tambahkan data dummy lain yang mungkin dibutuhkan oleh card
        });
        setLoading(false); // Selesai simulasi loading
        // Untuk simulasi error, Anda bisa uncomment baris ini:
        // setError('Simulasi error memuat data.');
      }, 1000); // Simulasi penundaan 1 detik
    };

    simulateFetch();
  }, []);

  // Tampilan saat data sedang dimuat (simulasi)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">Memuat Dashboard...</div>
      </div>
    );
  }

  // Tampilan saat terjadi error (bisa disimulasikan juga untuk testing UI)
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 dark:bg-red-900">
        <div className="text-lg font-semibold text-red-700 dark:text-red-300 p-4 rounded-lg bg-red-100 dark:bg-red-800 border border-red-300 dark:border-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-950 font-inter">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">Selamat Datang di Dashboard Anda</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Menggunakan komponen spesifik dashboard dengan data dummy */}
        <HargaPokokSummaryCard data={hargaPokokSummary} />
        <ComplaintStatsCard data={complaintStats} />
        <PengawasanStatusCard data={pengawasanSummary} />
      </div>

      {/* Bagian Informasi Umum */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Informasi Umum & Navigasi Cepat</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Selamat datang di sistem manajemen Anda. Dasbor ini memberikan gambaran singkat tentang metrik penting.
          Gunakan tautan di bawah ini atau navigasi di samping untuk mengakses fitur lainnya.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/dashboard/manifest"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md"
          >
            Lihat Manifest Tol Laut
          </Link>
          {/* Anda bisa menambahkan Link ke komponen QuickActions.js di sini nanti */}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;