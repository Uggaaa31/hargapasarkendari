import {
  Flex,
  useColorModeValue,
  Grid,
  Button,
  Stack,
  Text,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Wrap,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center, // Pastikan Center diimpor
  Icon, // Pastikan Icon diimpor
  // Skeleton, // Untuk skeleton loader (opsional)
  // SkeletonText, // Untuk skeleton loader (opsional)
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion"; // Jika ingin animasi micro-interaction

// Import komponen harga pokok Anda
import SummaryCardsHargaPokok from "./components/SummaryCardsHargaPokok";
import TableHargaPokok from "./components/TableHargaPokok";
import PriceTrendChartHargaPokok from "./components/PriceTrendChartHargaPokok";

// Import ikon baru untuk judul dan data kosong
import { MdOutlineLocalMall, MdOutlineInfo, MdOutlineBarChart } from 'react-icons/md';


// URL dasar API Laravel Anda
const API_BASE_URL = "http://127.0.0.1:8000/api";

function Harga() {
  // --- PALET WARNA KHUSUS DARI TEMA DASHBOARD ANDA (#00A389 sebagai aksen) ---
  const textColor = useColorModeValue("gray.700", "whiteAlpha.900");
  const secondaryTextColor = useColorModeValue("gray.500", "gray.400");
  
  const primaryDashboardTeal = "#00A389"; // Warna aksen utama
  const primaryDashboardTealHoverLight = "#008a74"; // Sedikit lebih gelap untuk mode terang
  const primaryDashboardTealHoverDark = "#2ee8c2"; // Sedikit lebih terang untuk mode gelap

  const primaryAccentColor = primaryDashboardTeal;
  const primaryAccentColorHover = useColorModeValue(primaryDashboardTealHoverLight, primaryDashboardTealHoverDark);

  const secondaryBgColor = useColorModeValue("gray.50", "gray.800"); 
  const cardBgColor = useColorModeValue("white", "gray.700"); 
  const pageBg = useColorModeValue("#F8F9FA", "gray.800"); // Latar belakang halaman

  const activeTabColor = primaryAccentColor;
  const inactiveTabColor = useColorModeValue("gray.600", "gray.400");
  const activeTabBorderColor = primaryAccentColor; // Ini mungkin tidak lagi dipakai langsung oleh Tabs.


  const [selectedMarket, setSelectedMarket] = useState("Semua Pasar");
  const [displayTableData, setDisplayTableData] = useState([]);
  const [displaySummaryData, setDisplaySummaryData] = useState({});
  const [displayChartData, setDisplayChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState("");
  const [allMarkets, setAllMarkets] = useState([]);

  const [loadingMarkets, setLoadingMarkets] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  useEffect(() => {
    const fetchMarkets = async () => {
      setLoadingMarkets(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/markets`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllMarkets(["Semua Pasar", ...data]);
      } catch (err) {
        console.error("Failed to fetch markets:", err);
        setError("Gagal memuat daftar pasar. Silakan periksa koneksi atau coba lagi.");
      } finally {
        setLoadingMarkets(false);
      }
    };
    fetchMarkets();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      setError(null);
      const today = new Date();
      // Untuk debugging, jika data Anda di database adalah untuk tanggal lain, uncomment baris di bawah:
      // const formattedToday = "2025-07-23";
      const formattedToday = today.toISOString().split("T")[0]; // YYYY-MM-DD

      try {
        const tableResponse = await fetch(
          `${API_BASE_URL}/harga-pokok?date=${formattedToday}&market=${selectedMarket}`
        );
        if (!tableResponse.ok) {
          throw new Error(`HTTP error! status: ${tableResponse.status}`);
        }
        const tableData = await tableResponse.json();
        setDisplayTableData(tableData);

        const summaryResponse = await fetch(
          `${API_BASE_URL}/harga-pokok/summary?date=${formattedToday}&market=${selectedMarket}`
        );
        if (!summaryResponse.ok) {
          throw new Error(`HTTP error! status: ${summaryResponse.status}`);
        }
        const summaryData = await summaryResponse.json();
        setDisplaySummaryData(summaryData);

        const trendResponse = await fetch(
          `${API_BASE_URL}/harga-pokok/trends?market=${selectedMarket}&days=10`
        );
        if (!trendResponse.ok) {
          throw new Error(`HTTP error! status: ${trendResponse.status}`);
        }
        const trendData = await trendResponse.json();
        setDisplayChartData(trendData);

        setChartTitle(
          `Tren Rata-rata Harga Barang Pokok (10 Hari Terakhir - ${selectedMarket})`
        );
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Gagal memuat data harga pokok. Pastikan server API berjalan dan data tersedia.");
        setDisplayTableData([]);
        setDisplaySummaryData({
          avgPrice: 0,
          highestPriceItem: {
            nama: "N/A",
            harga: 0,
            perubahan: 0,
            arahPerubahan: "unchanged",
          },
          lowestPriceItem: {
            nama: "N/A",
            harga: 0,
            perubahan: 0,
            arahPerubahan: "unchanged",
          },
          avgDailyChangeValue: 0,
          avgDailyChangeDirection: "unchanged",
        });
        setDisplayChartData([]);
        setChartTitle("");
      } finally {
        setLoadingData(false);
        setCurrentPage(1);
      }
    };

    if (allMarkets.length > 0) {
      fetchData();
    }
  }, [selectedMarket, allMarkets]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = displayTableData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(displayTableData.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getPaginationNumbers = () => {
    const maxPagesDisplay = 7;
    const pages = [];

    if (totalPages <= maxPagesDisplay) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesDisplay / 2));
      let endPage = Math.min(totalPages, startPage + maxPagesDisplay - 1);

      if (endPage - startPage + 1 < maxPagesDisplay) {
        startPage = Math.max(1, endPage - maxPagesDisplay + 1);
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }
    return [...new Set(pages)];
  };

  const paginationNumbers = getPaginationNumbers();

  const initialTabIndex = allMarkets.indexOf(selectedMarket);

  return (
    <Flex
      direction="column"
      pt={{ base: "90px", md: "40px" }}
      px={{ base: "15px", md: "40px" }}
      maxW="1400px"
      mx="auto"
      bg={useColorModeValue("#F8F9FA", "gray.800")} // Latar belakang halaman sesuai Dashboard
    >
      {error && (
        <Alert status="error" variant="left-accent" mb="40px" borderRadius="md" boxShadow="md">
          <AlertIcon />
          <AlertTitle mr={2}>Terjadi Kesalahan!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* --- Judul Halaman Utama: Harga Barang Pokok --- */}
      <Heading
        as="h1"
        fontSize={{ base: "4xl", md: "5xl", lg: "4xl" }} // Ukuran font besar
        mb="40px" // Margin bawah
        color={textColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="extrabold"
        letterSpacing="wide"
      >
        <Icon
          as={MdOutlineLocalMall} // Ikon untuk harga/pasar
          w={{ base: "48px", md: "60px", lg: "72px" }}
          h={{ base: "48px", md: "60px", lg: "72px" }}
          mr="15px"
          color={primaryAccentColor}
        />
        Harga Barang Pokok
      </Heading>

      {/* --- Bagian Loading --- */}
      {loadingMarkets || loadingData ? (
        <Flex justify="center" align="center" height="400px" direction="column" p="8">
          <Spinner
            thickness="4px"
            speed="0.8s"
            emptyColor={useColorModeValue("gray.200", "gray.600")}
            color={primaryAccentColor}
            size="xl"
            mb="6"
          />
          <Text fontSize="2xl" color={textColor} fontWeight="bold" letterSpacing="wide">
            Memuat Data Pasar...
          </Text>
          {/* Contoh Skeleton Loader jika Anda ingin lebih canggih */}
          {/* <Box padding="6" boxShadow="lg" bg={cardBgColor} mt="8" width="80%" borderRadius="md">
            <Skeleton height="20px" mb="4" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
            <Skeleton mt="4" height="150px" />
          </Box> */}
        </Flex>
      ) : (
        <>
          {/* --- Filter Pasar (Menggunakan Tabs) --- */}
          <Box mb="60px" p="8" borderRadius="xl" bg={cardBgColor} boxShadow="lg">
            <Heading as="h2" size="xl" mb="30px" color={textColor} textAlign="center" fontWeight="bold">
              Pilih Pasar untuk Analisis
            </Heading>

            {allMarkets.length > 0 ? (
              <Tabs
                variant="soft-rounded"
                colorScheme="blue" // Chakra akan menggunakan PrimaryAccentColor dari theme Chakra
                align="center"
                index={initialTabIndex !== -1 ? initialTabIndex : 0}
                onChange={(index) => setSelectedMarket(allMarkets[index])}
                isLazy
              >
                <TabList flexWrap="wrap" justifyContent="center">
                  {allMarkets.map((market) => (
                    <Tab
                      key={market}
                      px="6" py="3" m="2"
                      fontSize="md"
                      fontWeight="semibold"
                      _selected={{
                        color: "white",
                        bg: activeTabColor, // Menggunakan warna aksen baru
                        boxShadow: "sm",
                        transform: "translateY(-1px)",
                      }}
                      _hover={{
                        transform: "translateY(-1px)",
                        boxShadow: "md",
                      }}
                    >
                      {market}
                    </Tab>
                  ))}
                </TabList>
              </Tabs>
            ) : (
              <Text color={textColor} textAlign="center" py="4" fontSize="lg">
                Tidak ada daftar pasar yang tersedia.
              </Text>
            )}
          </Box>

          {/* --- Bagian Ringkasan Harga (Summary Cards) --- */}
          <Heading as="h2" size="xl" mb="30px" color={textColor} textAlign="center" fontWeight="bold">
            Ringkasan Harga Barang Pokok ({selectedMarket})
          </Heading>
          <Grid
            templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(3, 1fr)" }}
            gap="30px"
            mb="80px"
          >
            <SummaryCardsHargaPokok
              avgPrice={displaySummaryData.avgPrice}
              highestPriceItem={displaySummaryData.highestPriceItem}
              lowestPriceItem={displaySummaryData.lowestPriceItem}
              avgDailyChangeValue={displaySummaryData.avgDailyChangeValue}
              avgDailyChangeDirection={displaySummaryData.avgDailyChangeDirection}
              formatRupiah={formatRupiah}
              selectedMarket={selectedMarket}
              cardBgColor={cardBgColor}
              primaryAccentColor={primaryAccentColor}
            />
          </Grid>

          {/* --- Tabel Harga Barang Pokok --- */}
          <Heading as="h2" size="xl" mb="30px" color={textColor} textAlign="center" fontWeight="bold">
            Data Harga Barang Pokok Hari Ini ({selectedMarket})
          </Heading>
          <Box mb="60px" p="8" borderRadius="xl" bg={cardBgColor} boxShadow="lg" overflowX="auto">
            {currentRows.length > 0 ? (
              <TableHargaPokok
                data={currentRows}
                formatRupiah={formatRupiah}
                textColor={textColor}
                borderColor={useColorModeValue("gray.100", "gray.600")}
              />
            ) : (
              <Center flexDirection="column" py="100px"> {/* Empty state yang lebih visual */}
                <Icon as={MdOutlineInfo} w="60px" h="60px" color={secondaryTextColor} mb="4" />
                <Text color={secondaryTextColor} textAlign="center" fontSize="xl" fontWeight="medium">
                  Tidak ada data harga barang pokok yang tersedia untuk {selectedMarket} hari ini.
                </Text>
                <Text color={secondaryTextColor} textAlign="center" fontSize="md" mt="2">
                  Silakan pilih pasar lain atau periksa data Anda.
                </Text>
              </Center>
            )}
          </Box>

          {/* --- Kontrol Paginasi --- */}
          {totalPages > 1 && (
            <Flex justify="center" mb="80px">
              <Stack direction="row" spacing="8px">
                <Button
                  onClick={() => paginate(currentPage - 1)}
                  isDisabled={currentPage === 1}
                  variant="outline"
                  bg="transparent" // Jaga agar transparan
                  borderColor={useColorModeValue("gray.200", "gray.600")} // Border warna netral
                  color={textColor}
                  px="6" py="3"
                  fontSize="md"
                  fontWeight="medium"
                  borderRadius="lg"
                  _hover={{ bg: primaryAccentColorHover, color: "white", borderColor: "transparent" }} // Hover pakai warna aksen
                >
                  Previous
                </Button>
                {paginationNumbers.map((number, index) =>
                  number === "..." ? (
                    <Text key={`ellipsis-${index}`} color="gray.500" alignSelf="center" px="2" fontSize="lg">...</Text>
                  ) : (
                    <Button
                      key={number}
                      onClick={() => paginate(number)}
                      bg={currentPage === number ? primaryAccentColor : "transparent"}
                      color={currentPage === number ? "white" : textColor}
                      fontWeight={currentPage === number ? "bold" : "medium"}
                      borderWidth="1px"
                      borderColor={currentPage === number ? "transparent" : useColorModeValue("gray.200", "gray.600")}
                      _hover={{
                        bg: currentPage === number ? primaryAccentColorHover : useColorModeValue("gray.100", "gray.700"),
                        color: currentPage === number ? "white" : textColor,
                      }}
                      borderRadius="lg"
                      px="5" py="3"
                    >
                      {number}
                    </Button>
                  )
                )}
                <Button
                  onClick={() => paginate(currentPage + 1)}
                  isDisabled={currentPage === totalPages}
                  variant="outline"
                  bg="transparent" // Jaga agar transparan
                  borderColor={useColorModeValue("gray.200", "gray.600")} // Border warna netral
                  color={textColor}
                  px="6" py="3"
                  fontSize="md"
                  fontWeight="medium"
                  borderRadius="lg"
                  _hover={{ bg: primaryAccentColorHover, color: "white", borderColor: "transparent" }} // Hover pakai warna aksen
                >
                  Next
                </Button>
              </Stack>
            </Flex>
          )}

          {/* --- Grafik Tren Harga --- */}
          <Heading as="h2" size="xl" mb="30px" color={textColor} textAlign="center" fontWeight="bold">
            {chartTitle}
          </Heading>
          <Box mb="60px" p="8" borderRadius="xl" bg={cardBgColor} boxShadow="lg">
            {displayChartData.length > 0 ? (
              <PriceTrendChartHargaPokok
                data={displayChartData}
                chartTitle={chartTitle}
                formatRupiah={formatRupiah}
                textColor={textColor}
                primaryAccentColor={primaryAccentColor}
              />
            ) : (
              <Center flexDirection="column" py="100px"> {/* Empty state yang lebih visual */}
                <Icon as={MdOutlineBarChart} w="60px" h="60px" color={secondaryTextColor} mb="4" />
                <Text color={secondaryTextColor} textAlign="center" fontSize="xl" fontWeight="medium">
                  Tidak ada data tren harga yang tersedia untuk {selectedMarket}.
                </Text>
                <Text color={secondaryTextColor} textAlign="center" fontSize="md" mt="2">
                  Silakan pilih pasar lain atau periksa data Anda.
                </Text>
              </Center>
            )}
          </Box>
        </>
      )}
    </Flex>
  );
}
export default Harga;