import {
  Flex,
  useColorModeValue,
  Text,
  Heading,
  Select,
  Icon,
  Button,
  ButtonGroup,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Center,
  // Skeleton, // Opsional: Untuk efek loading yang lebih kompleks
  // SkeletonText, // Opsional: Untuk efek loading yang lebih kompleks
} from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";

import ManifestTable from "./components/ManifestTable"; // Pastikan ManifestTable mendukung props loading & empty state
import Card from "components/Card/Card"; // Asumsi Card ini adalah komponen Chakra-based Anda
import CardHeader from "components/Card/CardHeader"; // Asumsi CardHeader
import CardBody from "components/Card/CardBody"; // Asumsi CardBody

import {
  MdOutlineLocalShipping,
  MdOutlineFilterAlt,
  MdOutlineFormatListBulleted,
} from "react-icons/md"; // Pastikan Anda memiliki react-icons terinstal

// URL dasar API Laravel Anda
const API_BASE_URL = "http://127.0.0.1:8000/api";

function Manifest() {
  // --- PALET WARNA KHUSUS DARI TEMA DASHBOARD ANDA (#00A389 sebagai aksen) ---
  const textColor = useColorModeValue("gray.700", "whiteAlpha.900");
  const secondaryTextColor = useColorModeValue("gray.500", "gray.400");

  const primaryDashboardTeal = "#00A389"; // Ini adalah warna aksen yang tepat dari Dashboard Anda
  const primaryDashboardTealHoverLight = "#008a74";
  const primaryDashboardTealHoverDark = "#2ee8c2";

  const accentColor = primaryDashboardTeal;
  const accentColorHover = useColorModeValue(primaryDashboardTealHoverLight, primaryDashboardTealHoverDark);

  const cardBg = useColorModeValue("white", "gray.700");
  const inputBorderColor = useColorModeValue("gray.200", "gray.600");

  const btnActiveBg = accentColor;
  const btnActiveColor = "white";
  const btnInactiveBg = useColorModeValue("gray.100", "gray.600");
  const btnInactiveColor = useColorModeValue("gray.600", "gray.200");

  const [currentManifestData, setCurrentManifestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedKabupaten, setSelectedKabupaten] = useState("Semua");
  const [selectedVoyage, setSelectedVoyage] = useState("Semua");
  const [cargoType, setCargoType] = useState("outgoing"); // 'outgoing' or 'incoming'

  const [kabupatenOptions, setKabupatenOptions] = useState(["Semua"]);
  const [voyageOptions, setVoyageOptions] = useState(["Semua"]);

  const fetchFilterOptions = useCallback(
    async (type) => {
      setError(null);
      try {
        const kabResponse = await fetch(
          `${API_BASE_URL}/manifests/kabupaten-tujuan?type=${type}`
        );
        if (!kabResponse.ok)
          throw new Error(
            `HTTP error! status: ${kabResponse.status} (Kabupaten)`
          );
        const kabData = await kabResponse.json();
        setKabupatenOptions(["Semua", ...kabData]);

        const voyageResponse = await fetch(
          `${API_BASE_URL}/manifests/voyages?type=${type}`
        );
        if (!voyageResponse.ok)
          throw new Error(`HTTP error! status: ${voyageResponse.status} (Voyage)`);
        const voyageData = await voyageResponse.json();
        setVoyageOptions(["Semua", ...voyageData]);
      } catch (err) {
        console.error("Error fetching filter options:", err);
        setError(
          new Error("Gagal memuat opsi filter. Silakan coba periksa koneksi atau refresh halaman.")
        );
      }
    },
    []
  );

  const fetchManifestData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        type: cargoType,
        kabupaten: selectedKabupaten,
        voyage: selectedVoyage,
      }).toString();

      const response = await fetch(`${API_BASE_URL}/manifests?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCurrentManifestData(data);
    } catch (err) {
      console.error("Error fetching manifest data:", err);
      setError(
        new Error(
          err.message ||
            "Gagal memuat data manifest. Pastikan server API berjalan atau filter yang dipilih benar."
        )
      );
      setCurrentManifestData([]); // Kosongkan data jika ada error
    } finally {
      setLoading(false);
    }
  }, [cargoType, selectedKabupaten, selectedVoyage]);

  useEffect(() => {
    fetchFilterOptions(cargoType);
  }, [cargoType, fetchFilterOptions]);

  useEffect(() => {
    fetchManifestData();
  }, [fetchManifestData]);

  useEffect(() => {
    setSelectedKabupaten("Semua");
    setSelectedVoyage("Semua");
  }, [cargoType]);

  return (
    <Flex
      direction="column"
      pt={{ base: "30px", md: "50px" }}
      px={{ base: "15px", md: "40px" }}
      maxW="1400px"
      mx="auto"
      bg={useColorModeValue("#F8F9FA", "gray.800")}
    >
      {error && (
        <Alert status="error" variant="left-accent" mb="40px" borderRadius="md" boxShadow="md">
          <AlertIcon />
          <AlertTitle mr={2}>Terjadi Kesalahan!</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      {/* --- Judul Halaman Utama (Disesuaikan ukurannya) --- */}
      <Heading
        as="h1"
        fontSize={{ base: "4xl", md: "5xl", lg: "4xl" }} // Ukuran font besar untuk mobile juga
        mb="40px"
        color={textColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="extrabold"
        letterSpacing="wide"
      >
        <Icon
          as={MdOutlineLocalShipping}
          w={{ base: "48px", md: "60px", lg: "72px" }} // Ukuran ikon proporsional
          h={{ base: "48px", md: "60px", lg: "72px" }}
          mr="15px"
          color={accentColor}
        />
        Manajemen Data Manifest Tol Laut
      </Heading>

      {/* --- Button Group for Cargo Type (Muatan Keluar/Masuk) --- */}
      <Center mb="40px">
        <ButtonGroup
          isAttached
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
        >
          <Button
            onClick={() => setCargoType("outgoing")}
            bg={cargoType === "outgoing" ? btnActiveBg : btnInactiveBg}
            color={cargoType === "outgoing" ? btnActiveColor : btnInactiveColor}
            _hover={{
              bg: cargoType === "outgoing" ? accentColorHover : useColorModeValue("gray.200", "gray.500"),
              transform: 'translateY(-1px)',
              boxShadow: 'lg',
            }}
            _active={{
                transform: 'translateY(0px)',
                boxShadow: 'sm',
            }}
            px="6" py="3"
            fontSize={{ base: "md", md: "lg" }} // Ukuran font responsif
            fontWeight="semibold"
          >
            Muatan Keluar
          </Button>
          <Button
            onClick={() => setCargoType("incoming")}
            bg={cargoType === "incoming" ? btnActiveBg : btnInactiveBg}
            color={cargoType === "incoming" ? btnActiveColor : btnInactiveColor}
            _hover={{
              bg: cargoType === "incoming" ? accentColorHover : useColorModeValue("gray.200", "gray.500"),
              transform: 'translateY(-1px)',
              boxShadow: 'lg',
            }}
            _active={{
                transform: 'translateY(0px)',
                boxShadow: 'sm',
            }}
            px="6" py="3"
            fontSize={{ base: "md", md: "lg" }} // Ukuran font responsif
            fontWeight="semibold"
          >
          Muatan Masuk
          </Button>
        </ButtonGroup>
      </Center>

      {/* --- Card untuk Filter Data Manifest --- */}
      <Card mb="40px" bg={cardBg} borderRadius="xl" boxShadow="lg" p={{ base: "20px", md: "30px" }}>
        <CardHeader p="0" mb="25px">
          <Heading
            as="h2"
            fontSize={{ base: "xl", md: "2xl" }}
            color={textColor}
            display="flex"
            alignItems="center"
            fontWeight="bold"
          >
            <Icon
              as={MdOutlineFilterAlt}
              w={{ base: "24px", md: "28px" }}
              h={{ base: "24px", md: "28px" }}
              mr="10px"
              color={accentColor}
            />
            Saring Data Manifest
          </Heading>
        </CardHeader>
        <CardBody p="0">
          <Flex
            direction={{ base: "column", sm: "row" }}
            flexWrap="wrap"
            gap={{ base: "20px", md: "30px" }}
            alignItems={{ base: 'flex-start', sm: 'flex-end' }} // Alignment filter di mobile
          >
            {/* Filter Kabupaten Tujuan */}
            <Box>
              <Text fontSize="md" color={secondaryTextColor} fontWeight="medium" mb="8px">
                Kabupaten Tujuan:
              </Text>
              <Select
                value={selectedKabupaten}
                onChange={(e) => setSelectedKabupaten(e.target.value)}
                width={{ base: "100%", sm: "200px" }}
                borderColor={useColorModeValue("gray.200", "gray.600")}
                color={textColor}
                bg={useColorModeValue("white", "gray.800")}
                _hover={{ borderColor: accentColor }}
                _focus={{
                  borderColor: accentColor,
                  boxShadow: `0 0 0 1px ${accentColor}`,
                }}
                fontSize="md"
                borderRadius="md"
              >
                {kabupatenOptions.map((kab, idx) => (
                  <option key={idx} value={kab}>
                    {kab}
                  </option>
                ))}
              </Select>
            </Box>

            {/* Dropdown Filter Voyage */}
            <Box>
              <Text fontSize="md" color={secondaryTextColor} fontWeight="medium" mb="8px">
                Nomor Voyage:
              </Text>
              <Select
                value={selectedVoyage}
                onChange={(e) => setSelectedVoyage(e.target.value)}
                width={{ base: "100%", sm: "220px" }}
                borderColor={useColorModeValue("gray.200", "gray.600")}
                color={textColor}
                bg={useColorModeValue("white", "gray.800")}
                _hover={{ borderColor: accentColor }}
                _focus={{
                  borderColor: accentColor,
                  boxShadow: `0 0 0 1px ${accentColor}`,
                }}
                fontSize="md"
                borderRadius="md"
              >
                {voyageOptions.map((voyage, idx) => (
                  <option key={idx} value={voyage}>
                    {voyage}
                  </option>
                ))}
              </Select>
            </Box>
          </Flex>
        </CardBody>
      </Card>

      {/* --- Loading/Error/Empty State untuk Tabel Manifest --- */}
      <Card bg={cardBg} borderRadius="xl" boxShadow="lg" p={{ base: "20px", md: "30px" }}>
        <CardHeader p="0" mb="25px">
          <Heading
            as="h2"
            fontSize={{ base: "xl", md: "2xl" }}
            color={textColor}
            display="flex"
            alignItems="center"
            fontWeight="bold"
          >
            <Icon
              as={MdOutlineFormatListBulleted}
              w={{ base: "24px", md: "28px" }}
              h={{ base: "24px", md: "28px" }}
              mr="10px"
              color={accentColor}
            />
            {cargoType === "outgoing" ? "Daftar Muatan Berangkat" : "Daftar Muatan Masuk"}
          </Heading>
        </CardHeader>
        <CardBody p="0">
          {error ? (
            <Alert status="error" variant="left-accent" borderRadius="md" boxShadow="sm">
              <AlertIcon />
              <AlertTitle mr={2}>Gagal Memuat Data!</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          ) : loading ? (
            <Center flexDirection="column" py="100px">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor={useColorModeValue("gray.200", "gray.600")}
                color={accentColor}
                size="xl"
                mb="4"
              />
              <Text fontSize="xl" color={secondaryTextColor}>Memuat data manifest...</Text>
            </Center>
          ) : currentManifestData.length === 0 ? (
            <Center py="100px" flexDirection="column">
              <Icon as={MdOutlineFormatListBulleted} w="60px" h="60px" color={secondaryTextColor} mb="4" />
              <Text fontSize="xl" color={textColor} fontWeight="medium">
                Tidak ada data manifest untuk filter ini.
              </Text>
              <Text fontSize="md" color={secondaryTextColor} mt="2">
                Coba sesuaikan pilihan filter Anda.
              </Text>
            </Center>
          ) : (
            <Box overflowX="auto">
              <ManifestTable data={currentManifestData} />
            </Box>
          )}
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Manifest;