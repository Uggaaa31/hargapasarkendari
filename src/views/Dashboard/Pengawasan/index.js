import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  useToast,
  Flex,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  useColorModeValue,
  Icon,
  Container,
  Input, // Import Input
  InputGroup, // Import InputGroup
  InputLeftElement, // Import InputLeftElement
} from '@chakra-ui/react';
import PengawasanForm from './components/PengawasanForm';
import PengawasanList from './components/PengawasanList';
import { MdAddBox, MdOutlineMonitor, MdSearch } from 'react-icons/md'; // Import MdSearch
import { useDebounce } from 'use-debounce'; // Pastikan Anda sudah menginstal use-debounce

function Pengawasan() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // --- PALET WARNA DARI TEMA DASHBOARD ANDA (#00A389 sebagai aksen) ---
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");
  const primaryDashboardTeal = "#00A389";
  const primaryDashboardTealHoverLight = "#008a74";
  const primaryDashboardTealHoverDark = "#2ee8c2";
  const accentColor = primaryDashboardTeal;
  const accentColorHover = useColorModeValue(primaryDashboardTealHoverLight, primaryDashboardTealHoverDark);
  const cardBg = useColorModeValue("white", "gray.700");
  const pageBg = useColorModeValue("#F0F2F5", "gray.900");
  const inputBorderColor = useColorModeValue("gray.200", "gray.600"); // Tambahkan ini

  const [formData, setFormData] = useState({
    tanggalPengawasan: '',
    namaPengawas: '', // Menggunakan namaPengawas
    namaObjekPengawasan: '',
    lokasiKabupatenKota: '',
    waktuPengawasan: '',
    jenisPengawasan: '',
    detailPengawasan: {},
    catatanUmum: '',
    lampiran: null,
  });

  const [pengawasanData, setPengawasanData] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State untuk input pencarian
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // Debounce untuk search

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleDetailChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      detailPengawasan: {
        ...prev.detailPengawasan,
        [key]: value,
      },
    }));
  };

  // Fungsi untuk memetakan kunci snake_case ke camelCase
  const mapKeysToCamelCase = (dataArray) => {
    if (!Array.isArray(dataArray)) {
      console.error("Expected an array for mapping, but got:", dataArray);
      return [];
    }
    return dataArray.map(item => {
      const newItem = {};
      for (const key in item) {
        if (Object.hasOwnProperty.call(item, key)) {
          // Menangani tanggal_pengawasan agar tetap string 'YYYY-MM-DD'
          if (key === 'tanggal_pengawasan' && item[key]) {
              newItem['tanggalPengawasan'] = item[key].split(' ')[0]; // Ambil hanya tanggal
          } else {
              const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
              newItem[camelKey] = item[key];
          }
        }
      }
      return newItem;
    });
  };

  const fetchPengawasanData = useCallback(async (searchQuery = '') => {
    setIsLoadingList(true);
    try {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api'; // Gunakan env variable
      let url = `${baseUrl}/pengawasans`;
      if (searchQuery) {
        url += `?search=${encodeURIComponent(searchQuery)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal mengambil data pengawasan.');
      }
      const result = await response.json();
      setPengawasanData(mapKeysToCamelCase(result.data));
    } catch (error) {
      console.error('Error fetching pengawasan data:', error);
      toast({
        title: "Error fetching data.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsLoadingList(false);
    }
  }, [toast]); // Tambahkan toast sebagai dependency

  // Panggil fetchPengawasanData saat komponen pertama kali di-mount dan saat debouncedSearchTerm berubah
  useEffect(() => {
    fetchPengawasanData(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchPengawasanData]); // Tambahkan fetchPengawasanData sebagai dependency

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Data yang akan dikirim:', formData);

    const dataToSend = new FormData();
    for (const key in formData) {
        if (key === 'detailPengawasan') {
            dataToSend.append(key, JSON.stringify(formData[key]));
        } else if (key === 'lampiran' && formData[key]) {
            dataToSend.append(key, formData[key]);
        } else if (formData[key] !== null && formData[key] !== undefined) { // Hindari mengirim null/undefined jika tidak perlu
            dataToSend.append(key, formData[key]);
        }
    }

    try {
        const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${baseUrl}/pengawasans`, {
            method: 'POST',
            body: dataToSend,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Terjadi kesalahan saat menyimpan data.');
        }

        const result = await response.json();

        console.log('Respon dari server:', result);
        toast({
            title: "Berhasil!",
            description: result.message || "Data pengawasan berhasil disimpan.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
        });

        // Reset form
        setFormData({
            tanggalPengawasan: '',
            namaPengawas: '', // Pastikan namaPengawas, bukan namaPelaksana
            namaObjekPengawasan: '',
            lokasiKabupatenKota: '',
            waktuPengawasan: '',
            jenisPengawasan: '',
            detailPengawasan: {},
            catatanUmum: '',
            lampiran: null,
        });
        fetchPengawasanData(searchTerm); // Refresh daftar dengan search term saat ini
        onClose();
    } catch (error) {
        console.error('Error saat menyimpan data:', error);
        toast({
            title: "Gagal!",
            description: `Terjadi kesalahan: ${error.message}`,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
        });
    }
  };

  return (
    <Box pt={{ base: "50px", md: "70px", xl: "5px" }} bg={pageBg} minH="100vh">
      <Container maxW="container.xl" py={{ base: "40px", md: "60px" }} px={{ base: "15px", md: "40px" }}>
        <VStack spacing={{ base: 8, md: 10 }} align="stretch">
          <Box textAlign="center" mb={{ base: "20px", md: "40px" }}>
            <Heading
              as="h1"
              fontSize={{ base: "2.5xl", md: "4xl" }}
              mb={{ base: "10px", md: "15px" }}
              color={textColor}
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              <Icon
                as={MdOutlineMonitor}
                w={{ base: "40px", md: "60px", lg: "70px" }}
                h={{ base: "40px", md: "60px", lg: "70px" }}
                mr="15px"
                color={accentColor}
              />
              Manajemen Pengawasan Barang
            </Heading>
            <Text fontSize={{ base: "lg", md: "xl" }} color={secondaryTextColor} maxW="800px" mx="auto">
              Kelola data pengawasan barang beredar, jasa, dan perdagangan dengan mudah dan efisien.
            </Text>
          </Box>

          <Flex justifyContent="flex-end" mb={{ base: 4, md: 8 }}>
            <Button
              bg={accentColor}
              color="white"
              onClick={onOpen}
              leftIcon={<Icon as={MdAddBox} fontSize="2xl" />}
              size="lg"
              px={8}
              py={6}
              borderRadius="full"
              shadow="lg"
              _hover={{ shadow: 'xl', transform: 'translateY(-3px)', bg: accentColorHover }}
              _active={{ shadow: 'md', transform: 'translateY(0)', bg: accentColor }}
              transition="all 0.3s ease-in-out"
              fontWeight="bold"
            >
              Tambah Pengawasan Baru
            </Button>
          </Flex>

          <Drawer
            isOpen={isOpen}
            placement="right"
            size={{ base: 'full', sm: 'md', md: 'lg' }}
            onClose={onClose}
          >
            <DrawerOverlay />
            <DrawerContent bg={cardBg} borderRadius="xl" boxShadow="2xl">
              <DrawerCloseButton mt="4" mr="4" size="lg" />
              <DrawerHeader borderBottomWidth="1px" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" color={textColor} mb="20px" pt="6" pb="4">
                <Icon as={MdAddBox} mr="12px" color={accentColor} boxSize="32px" />
                Form Pengawasan Baru
              </DrawerHeader>
              <DrawerBody p={{ base: "20px", md: "40px" }}>
                <PengawasanForm
                  formData={formData}
                  onFormChange={handleChange}
                  onDetailChange={handleDetailChange}
                  onSubmit={handleSubmit}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          <Box bg={cardBg} p={{ base: 4, md: 8 }} borderRadius="xl" shadow="base">
            <Flex mb={6} alignItems="center" justifyContent="space-between" flexDirection={{ base: 'column', md: 'row' }}>
              <Heading as="h2" size="xl" color={textColor} textAlign="left" display="flex" alignItems="center" mb={{ base: 4, md: 0 }}>
                <Icon as={MdOutlineMonitor} mr="10px" color={accentColor} />
                Daftar Pengawasan
              </Heading>
              {/* Input Pencarian */}
              <InputGroup maxWidth={{ base: "full", md: "500px" }}>
                <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={MdSearch} color="gray.400" />}
                />
                <Input
                    placeholder="Cari berdasarkan objek, pengawas, jenis, atau lokasi"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    borderRadius="full"
                    bg={useColorModeValue("gray.50", "gray.600")}
                    borderColor={inputBorderColor}
                    color={textColor}
                    _focus={{
                        borderColor: accentColor,
                        boxShadow: `0 0 0 1px ${accentColor}`,
                    }}
                />
              </InputGroup>
            </Flex>
            <PengawasanList data={pengawasanData} isLoading={isLoadingList} />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

export default Pengawasan;