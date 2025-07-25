import React from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Spinner,
  Center,
  useBreakpointValue,
  Flex,
  Tag,
  Divider,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa'; // Icon untuk empty state
import { MdOutlineFormatListBulleted } from 'react-icons/md'; // Contoh ikon untuk empty state

function PengawasanList({ data, isLoading }) {
  const textColor = useColorModeValue("gray.700", "whiteAlpha.900");
  const secondaryTextColor = useColorModeValue("gray.500", "gray.400");
  const primaryDashboardTeal = "#00A389";
  const accentColor = primaryDashboardTeal;
  const cardBg = useColorModeValue("white", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.800");

  const isMobile = useBreakpointValue({ base: true, lg: false });

  if (isLoading) {
    return (
      <Center p={8} bg={cardBg} borderRadius="xl" boxShadow="lg" minH="200px">
        <Spinner size="xl" color={accentColor} thickness="4px" />
        <Text ml={4} fontSize="lg" color={secondaryTextColor}>Memuat data pengawasan...</Text>
      </Center>
    );
  }

  // Data sudah difilter oleh parent component (Pengawasan.js) dan kunci sudah dipetakan ke camelCase
  const displayData = data;

  return (
    <Box p={0}>
      {displayData.length === 0 ? (
        <Center py={10} flexDirection="column">
          <Icon as={FaSearch} w="60px" h="60px" color={secondaryTextColor} mb="4" />
          <Text textAlign="center" color={secondaryTextColor} fontSize="xl" fontWeight="medium">
            Tidak ada data pengawasan yang cocok.
          </Text>
          <Text textAlign="center" color={secondaryTextColor} fontSize="md" mt="2">
            Coba sesuaikan kata kunci pencarian Anda.
          </Text>
        </Center>
      ) : (
        <>
          {/* Tampilan untuk Mobile (Kartu) */}
          {isMobile ? (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {displayData.map((item, index) => (
                <Box key={item.id || index} p={5} bg={cardBg} borderRadius="lg" boxShadow="md" _hover={{ boxShadow: 'lg' }} transition="all 0.2s ease-in-out">
                  <Flex justifyContent="space-between" alignItems="center" mb={2}>
                    <Text fontSize="sm" color={secondaryTextColor}>Tanggal: {item.tanggalPengawasan}</Text>
                    <Tag size="md" colorScheme="teal" borderRadius="full" px="3">
                      {item.jenisPengawasan}
                    </Tag>
                  </Flex>
                  <Heading size="md" mb={2} color={accentColor} fontWeight="semibold">{item.namaObjekPengawasan}</Heading>
                  <Text fontSize="md" color={textColor}>Pengawas: <Text as="span" fontWeight="semibold">{item.namaPengawas}</Text></Text> {/* Menggunakan namaPengawas */}
                  <Text fontSize="md" color={textColor}>Lokasi: {item.lokasiKabupatenKota}</Text>
                  <Text fontSize="md" color={textColor}>Waktu: {item.waktuPengawasan}</Text>
                  <Divider my={3} borderColor={useColorModeValue("gray.200", "gray.600")} />
                  <Text fontSize="sm" color={secondaryTextColor}>
                    Catatan: {item.catatanUmum || 'Tidak ada catatan.'}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            /* Tampilan untuk Desktop (Tabel) */
            <Box overflowX="auto">
              <Table variant="simple" size="md" minWidth="max-content">
                <Thead>
                  <Tr bg={useColorModeValue("gray.50", "gray.800")}>
                    <Th py={3} color={textColor} fontWeight="semibold">No.</Th>
                    <Th py={3} color={textColor} fontWeight="semibold">Tanggal</Th>
                    <Th py={3} color={textColor} fontWeight="semibold">Pengawas</Th> {/* Menggunakan Pengawas */}
                    <Th py={3} color={textColor} fontWeight="semibold">Objek</Th>
                    <Th py={3} color={textColor} fontWeight="semibold">Jenis</Th>
                    <Th py={3} color={textColor} fontWeight="semibold">Lokasi</Th>
                    <Th py={3} color={textColor} fontWeight="semibold">Waktu</Th>
                    <Th py={3} color={textColor} fontWeight="semibold">Detail Singkat</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {displayData.map((item, index) => (
                    <Tr key={item.id || index} _hover={{ bg: hoverBg }} transition="background-color 0.2s ease">
                      <Td color={textColor}>{index + 1}</Td>
                      <Td color={textColor}>{item.tanggalPengawasan}</Td>
                      <Td color={textColor}>{item.namaPengawas}</Td> {/* Menggunakan namaPengawas */}
                      <Td fontWeight="semibold" color={accentColor}>{item.namaObjekPengawasan}</Td>
                      <Td><Tag size="md" colorScheme="teal" borderRadius="full" px="3">{item.jenisPengawasan}</Tag></Td>
                      <Td color={textColor}>{item.lokasiKabupatenKota}</Td>
                      <Td color={textColor}>{item.waktuPengawasan}</Td>
                      <Td fontSize="sm" color={secondaryTextColor}>
                        {/* Akses detailPengawasan dengan operator opsional chaining (?) */}
                        {item.jenisPengawasan === 'Barang Beredar' && `SNI: ${item.detailPengawasan?.sesuaiSNI ? 'Ya' : 'Tidak'}, Label: ${item.detailPengawasan?.kelengkapanLabel ? 'Ya' : 'Tidak'}`}
                        {item.jenisPengawasan === 'Jasa' && `Jenis: ${item.detailPengawasan?.jenisJasa || 'N/A'}, Kualitas: ${item.detailPengawasan?.kualitasLayanan?.substring(0, 50) || 'N/A'}...`}
                        {item.jenisPengawasan === 'Perdagangan' && `Izin: ${item.detailPengawasan?.jenisPerizinan || 'N/A'}, Status: ${item.detailPengawasan?.statusPerizinan || 'N/A'}`}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default PengawasanList;