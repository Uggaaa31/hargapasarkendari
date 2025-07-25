// src/views/Dashboard/Pengaduan/index.js
import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Flex,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tab, TabList, TabPanels, TabPanel, Tabs,
  useColorModeValue,
  Spinner,
  Alert, AlertIcon, AlertDescription,
  Heading,
  Icon,
  Center,
} from "@chakra-ui/react";

import Card from "components/Card/Card";
import BarChartComponent from "../../../components/Charts/BarChartComponent";
import PieChartComponent from "../../../components/Charts/PieChartComponent";

import FormPengaduan from "./components/FormPengaduan";
import FormPertanyaan from "./components/FormPertanyaan";
import FormPenyampaianInformasi from "./components/FormPenyampaianInformasi";

import { MdOutlineSpeakerNotes, MdOutlineInfo, MdOutlineBarChart, MdOutlinePieChart } from 'react-icons/md';


function Pengaduan() {
  const { isOpen: isReportModalOpen, onOpen: onReportModalOpen, onClose: onReportModalClose } = useDisclosure();

  // --- PALET WARNA DARI TEMA DASHBOARD ANDA (#00A389 sebagai aksen) ---
  const textColor = useColorModeValue("gray.700", "whiteAlpha.900");
  const secondaryTextColor = useColorModeValue("gray.500", "gray.400");

  const primaryDashboardTeal = "#00A389";
  const primaryDashboardTealHoverLight = "#008a74";
  const primaryDashboardTealHoverDark = "#2ee8c2";

  const accentColor = primaryDashboardTeal;
  const accentColorHover = useColorModeValue(primaryDashboardTealHoverLight, primaryDashboardTealHoverDark);

  const cardBg = useColorModeValue("white", "gray.700");
  const pageBg = useColorModeValue("#F8F9FA", "gray.800");

  const activeTabColor = accentColor;
  const inactiveTabColor = useColorModeValue("gray.600", "gray.400");
  const tabBorderColor = useColorModeValue("gray.200", "gray.600");

  const [currentPeriodText, setCurrentPeriodText] = useState("");
  const [percentageChartData, setPercentageChartData] = useState(null);
  const [commodityChartData, setCommodityChartData] = useState(null);
  const [loadingCharts, setLoadingCharts] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const fetchChartData = async () => {
    setLoadingCharts(true);
    setFetchError(null);
    const today = new Date();
    const year = today.getFullYear();
    const currentMonth = today.getMonth();
    const daysInMonth = getDaysInMonth(year, currentMonth);

    setCurrentPeriodText(`Periode 1 ${monthNames[currentMonth]} s.d ${daysInMonth} ${monthNames[currentMonth]} ${year}`);

    const formattedMonth = (currentMonth + 1).toString().padStart(2, '0');

    const queryParams = new URLSearchParams({
      year: year,
      month: formattedMonth,
    }).toString();

    try {
      const percentageResponse = await fetch(`http://127.0.0.1:8000/api/dashboard/complaint-stats?${queryParams}`);
      if (!percentageResponse.ok) throw new Error("Gagal mengambil data persentase pengaduan.");
      const percentageResult = await percentageResponse.json();
      setPercentageChartData(percentageResult.data);

      const commodityResponse = await fetch(`http://127.0.0.1:8000/api/dashboard/commodity-stats?${queryParams}`);
      if (!commodityResponse.ok) throw new Error("Gagal mengambil data komoditi pengaduan.");
      const commodityResult = await commodityResponse.json();
      setCommodityChartData(commodityResult.data);

    } catch (err) {
      console.error("Error fetching chart data:", err);
      setFetchError("Gagal memuat data grafik. Silakan coba lagi nanti.");
    } finally {
      setLoadingCharts(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  const handleModalClose = () => {
    onReportModalClose();
    fetchChartData();
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} bg={pageBg}>
      {/* Header Halaman: Judul dan Tombol Buat Laporan */}
      <Flex
        mb="40px"
        justifyContent="space-between"
        alignItems="center"
        px={{ base: "15px", md: "40px" }}
        maxW="1400px"
        mx="auto"
        flexWrap="wrap" // Memungkinkan wrapping di mobile
        gap={{ base: "15px", md: "0" }} // Menambah gap jika wrapping
      >
        <Heading
          as="h1"
          fontSize={{ base: "2xl", md: "4xl", lg: "4xl" }}
          color={textColor}
          fontWeight="extrabold"
          letterSpacing="wide"
          display="flex"
          alignItems="center"
          // Tambahkan flex-grow agar mengambil ruang yang tersedia, terutama di mobile
          flexGrow={1} 
          // Hapus justifyContent center di sini jika flexWrap digunakan,
          // biarkan Flex parent yang menangani justifyContent
          justifyContent={{base: "center", md: "flex-start"}} 
        >
          <Icon
            as={MdOutlineSpeakerNotes}
            w={{ base: "36px", md: "48px", lg: "60px" }}
            h={{ base: "36px", md: "48px", lg: "60px" }}
            mr="15px"
            color={accentColor}
          />
          Pengaduan Konsumen
        </Heading>
        <Button
          onClick={onReportModalOpen}
          bg={accentColor}
          color="white"
          px={{ base: "20px", md: "30px" }} // Padding horizontal responsif
          py="15px"
          borderRadius="lg"
          boxShadow="md"
          _hover={{
            bg: accentColorHover,
            transform: 'translateY(-2px)',
            boxShadow: 'lg'
          }}
          _active={{
            transform: 'translateY(0)',
            boxShadow: 'sm'
          }}
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="semibold"
          flexShrink={0} // Pastikan tombol tidak menyusut terlalu banyak
        >
          Buat Laporan Baru
        </Button>
      </Flex>

      {/* Pesan Error Global untuk Chart */}
      {fetchError && (
        <Alert status="error" mb="20px" mx="auto" maxW="1400px" px={{ base: "15px", md: "40px" }} borderRadius="md">
          <AlertIcon />
          <AlertDescription>{fetchError}</AlertDescription>
        </Alert>
      )}

      {/* Bagian Grafik Atas (Pie Chart dan Bar Chart Jumlah) */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="30px" mb="40px" px={{ base: "15px", md: "40px" }} maxW="1400px" mx="auto">
        {/* Card untuk Persentase Pengaduan */}
        <Card p="30px" borderRadius="xl" boxShadow="lg" bg={cardBg}>
          <Heading as="h2" fontSize={{ base: "xl", md: "3xl" }} fontWeight="bold" color={textColor} mb="15px">
            Persentase Pengaduan
            <br/>
            <Text as="span" fontSize="md" color={secondaryTextColor} fontWeight="normal">{currentPeriodText}</Text>
          </Heading>
          {loadingCharts ? (
            <Flex justifyContent="center" alignItems="center" height="250px">
              <Spinner size="xl" color={accentColor} />
            </Flex>
          ) : (
            <Flex justifyContent="center" alignItems="center" height="250px" width="100%">
              {percentageChartData && percentageChartData.labels && percentageChartData.labels.length > 0 ? (
                <PieChartComponent chartData={percentageChartData} />
              ) : (
                <Center flexDirection="column" py="4">
                  <Icon as={MdOutlinePieChart} w="60px" h="60px" color={secondaryTextColor} mb="4" />
                  <Text color={secondaryTextColor} fontSize="lg" fontWeight="medium">Data persentase tidak tersedia.</Text>
                </Center>
              )}
            </Flex>
          )}
        </Card>

        {/* Card untuk Jumlah Pengaduan */}
        <Card p="30px" borderRadius="xl" boxShadow="lg" bg={cardBg}>
          <Heading as="h2" fontSize={{ base: "xl", md: "3xl" }} fontWeight="bold" color={textColor} mb="15px">
            Jumlah Pengaduan Konsumen
            <br/>
            <Text as="span" fontSize="md" color={secondaryTextColor} fontWeight="normal">{currentPeriodText}</Text>
          </Heading>
          {loadingCharts ? (
            <Flex justifyContent="center" alignItems="center" height="250px">
              <Spinner size="xl" color={accentColor} />
            </Flex>
          ) : (
            <Flex justifyContent="center" alignItems="center" height="250px" width="100%">
              {commodityChartData && commodityChartData.labels && commodityChartData.labels.length > 0 ? (
                <BarChartComponent chartData={commodityChartData} />
              ) : (
                <Center flexDirection="column" py="4">
                  <Icon as={MdOutlineBarChart} w="60px" h="60px" color={secondaryTextColor} mb="4" />
                  <Text color={secondaryTextColor} fontSize="lg" fontWeight="medium">Data jumlah tidak tersedia.</Text>
                </Center>
              )}
            </Flex>
          )}
        </Card>
      </SimpleGrid>

      {/* Card untuk Pengaduan Kasus Terbanyak Berdasarkan Komoditi */}
      <Card p="30px" mb="40px" borderRadius="xl" boxShadow="lg" bg={cardBg} px={{ base: "15px", md: "40px" }} maxW="1400px" mx="auto">
        <Heading as="h2" fontSize={{ base: "xl", md: "3xl" }} fontWeight="bold" color={textColor} mb="15px">
          Pengaduan Kasus Terbanyak Berdasarkan Komoditi
          <br/>
          <Text as="span" fontSize="md" color={secondaryTextColor} fontWeight="normal">{currentPeriodText}</Text>
        </Heading>
        {loadingCharts ? (
            <Flex justifyContent="center" alignItems="center" height="300px">
              <Spinner size="xl" color={accentColor} />
            </Flex>
          ) : (
            <Flex justifyContent="center" alignItems="center" height="300px" width="100%">
              {commodityChartData && commodityChartData.labels && commodityChartData.labels.length > 0 ? (
                <BarChartComponent chartData={commodityChartData} />
              ) : (
                <Center flexDirection="column" py="4">
                  <Icon as={MdOutlineBarChart} w="60px" h="60px" color={secondaryTextColor} mb="4" />
                  <Text color={secondaryTextColor} fontSize="lg" fontWeight="medium">Data komoditi tidak tersedia.</Text>
                </Center>
              )}
            </Flex>
          )}
      </Card>

      {/* Modal untuk Memilih dan Mengisi Formulir */}
      <Modal isOpen={isReportModalOpen} onClose={handleModalClose} size="4xl">
        <ModalOverlay />
        <ModalContent borderRadius="xl" boxShadow="2xl" bg={cardBg}>
          <ModalHeader color={textColor} fontSize="2xl" fontWeight="bold" mb="20px">Buat Laporan Baru</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="30px">
            <Tabs isFitted variant="enclosed" colorScheme="teal">
              <TabList mb="1.5em" flexWrap="wrap"> {/* TabList bisa wrap di mobile */}
                <Tab
                  _selected={{ color: 'white', bg: activeTabColor, boxShadow: 'sm' }}
                  _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
                  fontWeight="semibold"
                  borderRadius="md"
                  borderColor={tabBorderColor}
                >
                  Formulir Pengaduan
                </Tab>
                <Tab
                  _selected={{ color: 'white', bg: activeTabColor, boxShadow: 'sm' }}
                  _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
                  fontWeight="semibold"
                  borderRadius="md"
                  borderColor={tabBorderColor}
                >
                  Formulir Pertanyaan
                </Tab>
                <Tab
                  _selected={{ color: 'white', bg: activeTabColor, boxShadow: 'sm' }}
                  _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
                  fontWeight="semibold"
                  borderRadius="md"
                  borderColor={tabBorderColor}
                >
                  Formulir Penyampaian Informasi
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel px="0" py="0">
                  <FormPengaduan onClose={handleModalClose} />
                </TabPanel>
                <TabPanel px="0" py="0">
                  <FormPertanyaan onClose={handleModalClose} />
                </TabPanel>
                <TabPanel px="0" py="0">
                  <FormPenyampaianInformasi onClose={handleModalClose} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Pengaduan;