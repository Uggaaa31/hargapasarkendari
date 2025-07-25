// src/data/hargaBarangPokok.js

// Mendapatkan tanggal hari ini (contoh: 12 Juli 2025)
const today = new Date('2025-07-12T00:00:00'); // Sesuaikan dengan tanggal hari ini atau tanggal data terbaru Anda

// Fungsi helper untuk mendapatkan tanggal X hari yang lalu
const getDateNDaysAgo = (n) => {
  const date = new Date(today);
  date.setDate(today.getDate() - n);
  return date;
};

// Fungsi untuk format tanggal menjadi YYYY-MM-DD
const formatDate = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months start at 0!
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

// Fungsi untuk format tanggal menjadi "DD MMMM YYYY" (misal: 12 Juli 2025)
const formatDisplayDate = (date) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(date).toLocaleDateString('id-ID', options);
};


// --- Data Historis (Simulasi) ---
export const historicalHargaData = [];

const numDays = 90; // Untuk 3 bulan terakhir
const itemsToTrack = [
  { id: 'beras_medium', name: 'Beras Medium', satuan: 'Kg', basePrice: 12000, volatility: 500 },
  { id: 'gula_pasir', name: 'Gula Pasir', satuan: 'Kg', basePrice: 16500, volatility: 300 },
  { id: 'minyak_goreng', name: 'Minyak Goreng Curah', satuan: 'Liter', basePrice: 15500, volatility: 400 },
  { id: 'cabe_rawit', name: 'Cabai Rawit Merah', satuan: 'Kg', basePrice: 50000, volatility: 2000 },
  { id: 'bawang_merah', name: 'Bawang Merah', satuan: 'Kg', basePrice: 38000, volatility: 1000 },
];

const specificMarkets = [
  "Pasar Sentral Kota Kendari",
  "Pasar Mandonga",
  "Paddys Market",
  "Pasar Anduonohu",
  "Pasar Baruga"
];

// REVISI LOGIKA PEMBUATAN DATA: Pastikan setiap item ada di setiap pasar, setiap hari
for (let i = 0; i < numDays; i++) {
  const currentDate = getDateNDaysAgo(numDays - 1 - i);
  const formattedDate = formatDate(currentDate);
  const displayDate = formatDisplayDate(currentDate);

  specificMarkets.forEach(marketName => { // Loop untuk setiap pasar
    itemsToTrack.forEach(itemConfig => { // Loop untuk setiap item
      // Simulasi harga berfluktuasi
      const fluctuation = (Math.random() - 0.5) * 2 * itemConfig.volatility;
      let harga = itemConfig.basePrice + fluctuation;
      harga = Math.round(harga / 100) * 100;

      // Simulasi perubahan vs hari sebelumnya (untuk item dan pasar spesifik)
      let prevDayPrice = null;
      if (i > 0) {
        const prevDate = formatDate(getDateNDaysAgo(numDays - i));
        const prevEntry = historicalHargaData.find(d => d.date === prevDate && d.id === itemConfig.id && d.pasarSumber === marketName);
        if (prevEntry) {
          prevDayPrice = prevEntry.harga;
        }
      }

      let perubahan = 0;
      let arahPerubahan = "stabil";
      if (prevDayPrice !== null) {
        perubahan = ((harga - prevDayPrice) / prevDayPrice) * 100;
        if (perubahan > 0.1) {
          arahPerubahan = "naik";
        } else if (perubahan < -0.1) {
          arahPerubahan = "turun";
        }
        perubahan = parseFloat(perubahan.toFixed(1));
      }

      historicalHargaData.push({
        id: itemConfig.id,
        date: formattedDate,
        displayDate: displayDate,
        nama: itemConfig.name,
        satuan: itemConfig.satuan,
        harga: harga,
        perubahan: perubahan,
        arahPerubahan: arahPerubahan,
        pasarSumber: marketName, // Pasar sudah spesifik
      });
    });
  });
}

// --- Data untuk Tren Grafik (Hanya Beras Medium) ---
// Ini akan tetap menjadi data beras medium, tapi kini untuk setiap pasar.
// Karena chart Anda menampilkan "Tren Rata-rata Harga Barang Pokok", trenBerasData ini mungkin tidak lagi digunakan untuk chart.
// Biarkan saja seperti ini untuk jaga-jaga jika ada bagian lain yang memakainya.
export const trenBerasData = historicalHargaData
  .filter(item => item.id === 'beras_medium')
  .map(item => ({ date: item.displayDate.split(' ')[0] + ' ' + item.displayDate.split(' ')[1], harga: item.harga }));

// --- Data Hari Ini (untuk Summary Cards dan tampilan default) ---
export const hargaBarangPokokToday = itemsToTrack.map(itemConfig => {
  // Ambil data terbaru untuk setiap item dari setiap pasar
  const latestEntriesForToday = historicalHargaData.filter(d => d.date === formatDate(today) && d.id === itemConfig.id);
  
  if (latestEntriesForToday.length === 0) return undefined; // Jika tidak ada data untuk hari ini
  
  // Jika ada banyak pasar, ambil rata-rata harga untuk item ini di semua pasar hari ini
  const avgPriceThisItemToday = latestEntriesForToday.reduce((sum, entry) => sum + entry.harga, 0) / latestEntriesForToday.length;

  // Untuk perubahan vs kemarin, cari item yang sama dari hari kemarin
  const yesterdayEntryForThisItem = historicalHargaData.find(d => d.date === formatDate(getDateNDaysAgo(1)) && d.id === itemConfig.id);

  let perubahanVsKemarin = 0;
  let arahPerubahanVsKemarin = "stabil";
  if (yesterdayEntryForThisItem) {
    const change = ((avgPriceThisItemToday - yesterdayEntryForThisItem.harga) / yesterdayEntryForThisItem.harga) * 100;
    if (change > 0.1) {
      arahPerubahanVsKemarin = "naik";
    } else if (change < -0.1) {
      arahPerubahanVsKemarin = "turun";
    }
    perubahanVsKemarin = parseFloat(change.toFixed(1));
  }

  // Mengembalikan representasi item hari ini (rata-rata semua pasar)
  return {
    id: itemConfig.id,
    date: formatDate(today),
    displayDate: formatDisplayDate(today),
    nama: itemConfig.name,
    satuan: itemConfig.satuan,
    harga: avgPriceThisItemToday, // Rata-rata harga item ini di semua pasar hari ini
    perubahan: perubahanVsKemarin,
    arahPerubahan: arahPerubahanVsKemarin,
    pasarSumber: "Semua Pasar", // Karena ini rata-rata semua pasar
    lastUpdated: formatDisplayDate(today),
  };
}).filter(Boolean); // Filter undefined jika ada

// DAFTAR PASAR YANG AKAN DIGUNAKAN DI FILTER UI
export const allMarkets = specificMarkets; // Menggunakan daftar pasar yang spesifik

// Data untuk summary cards (akan dihitung ulang berdasarkan filter pasar)
export const initialSummaryData = {
  // Hanya ambil data hari ini sebagai inisial (rata-rata semua pasar)
  hargaBarangPokokToday: hargaBarangPokokToday,
  avgPriceToday: hargaBarangPokokToday.length > 0 ? hargaBarangPokokToday.reduce((sum, item) => sum + item.harga, 0) / hargaBarangPokokToday.length : 0,
  highestPriceItemToday: hargaBarangPokokToday.reduce((prev, current) => (prev && prev.harga > current.harga) ? prev : current, { harga: -Infinity, nama: "N/A" }), 
  lowestPriceItemToday: hargaBarangPokokToday.reduce((prev, current) => (prev && prev.harga < current.harga) ? prev : current, { harga: Infinity, nama: "N/A" }), 
};