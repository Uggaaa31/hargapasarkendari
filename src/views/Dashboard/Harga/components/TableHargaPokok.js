import React from "react";
import {
  Flex, Text, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue, Icon, Box
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa";

const TableHargaPokok = ({ data, formatRupiah, indexOfFirstRow }) => { // Terima indexOfFirstRow
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("gray.600", "gray.300"); // Warna teks baris
  const borderColor = useColorModeValue("gray.200", "gray.600"); // Warna border tabel
  const cardBg = useColorModeValue("white", "gray.700");
  const headerColor = useColorModeValue("gray.500", "gray.400"); // Warna teks header tabel

  const getArrowIcon = (arah) => {
    if (arah === 'naik') return <Icon as={FaArrowUp} color="red.500" w="10px" h="10px" me="4px" />;
    if (arah === 'turun') return <Icon as={FaArrowDown} color="green.500" w="10px" h="10px" me="4px" />;
    return <Icon as={FaMinus} color="gray.500" w="10px" h="10px" me="4px" />;
  };

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }} p='20px' bg={cardBg} boxShadow="lg" borderRadius="xl"> {/* Padding lebih besar, shadow lebih halus */}
      <CardHeader p='12px 0px 12px 0px'>
        <Text fontSize='lg' color={textColor} fontWeight='bold' mb="15px"> {/* Tambah margin bawah */}
          Daftar Harga Barang Pokok Hari Ini
        </Text>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px">
              <Th ps="0px" color={headerColor} borderBottomColor={borderColor} fontSize="xs" textTransform="uppercase" fontWeight="bold">No</Th> {/* Header lebih terdefinisi */}
              <Th color={headerColor} borderBottomColor={borderColor} fontSize="xs" textTransform="uppercase" fontWeight="bold">Nama Barang</Th>
              <Th color={headerColor} borderBottomColor={borderColor} fontSize="xs" textTransform="uppercase" fontWeight="bold">Satuan</Th>
              <Th color={headerColor} borderBottomColor={borderColor} fontSize="xs" textTransform="uppercase" fontWeight="bold">Harga Hari Ini</Th>
              <Th color={headerColor} borderBottomColor={borderColor} fontSize="xs" textTransform="uppercase" fontWeight="bold">Perubahan</Th>
              <Th color={headerColor} borderBottomColor={borderColor} fontSize="xs" textTransform="uppercase" fontWeight="bold">Pasar Sumber</Th>
              <Th color={headerColor} borderBottomColor={borderColor} fontSize="xs" textTransform="uppercase" fontWeight="bold">Terakhir Diperbarui</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0 ? ( // Periksa jika ada data
              data.map((item, index) => {
                const rowColor = item.arahPerubahan === 'naik' ? "red.500" : item.arahPerubahan === 'turun' ? "green.500" : tableRowColor;
                return (
                  <Tr key={item.id} _hover={{ bg: useColorModeValue("gray.50", "gray.800") }} transition="background-color 0.2s ease-in-out"> {/* Efek hover dan transisi */}
                    <Td ps="0px" borderBottomColor={borderColor} py="12px"> {/* Padding vertikal untuk baris */}
                      <Text fontSize="sm" color={textColor} fontWeight="medium">
                        {(indexOfFirstRow || 0) + index + 1} {/* Nomor urut yang benar untuk pagination */}
                      </Text>
                    </Td>
                    <Td borderBottomColor={borderColor}>
                      <Text fontSize="sm" color={textColor} fontWeight="medium">
                        {item.nama}
                      </Text>
                    </Td>
                    <Td borderBottomColor={borderColor}>
                      <Text fontSize="sm" color={tableRowColor} fontWeight="normal">
                        {item.satuan}
                      </Text>
                    </Td>
                    <Td borderBottomColor={borderColor}>
                      <Text fontSize="sm" color={textColor} fontWeight="bold">
                        {formatRupiah(item.harga)}
                      </Text>
                    </Td>
                    <Td borderBottomColor={borderColor}>
                      <Flex align="center">
                        {getArrowIcon(item.arahPerubahan)}
                        <Text fontSize="sm" color={rowColor} fontWeight="semibold">
                          {item.perubahan !== 0 ? `${Math.abs(item.perubahan)}%` : 'Stabil'}
                        </Text>
                      </Flex>
                    </Td>
                    <Td borderBottomColor={borderColor}>
                      <Text fontSize="sm" color={tableRowColor} fontWeight="normal">
                        {item.pasarSumber}
                      </Text>
                    </Td>
                    <Td borderBottomColor={borderColor}>
                      <Text fontSize="sm" color={tableRowColor} fontWeight="normal">
                        {item.lastUpdated}
                      </Text>
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td colSpan={7}> {/* Span semua kolom */}
                  <Flex justify="center" align="center" py="20px" direction="column">
                    <Text fontSize="md" color="gray.500">Tidak ada data harga barang pokok untuk pasar ini hari ini.</Text>
                    <Text fontSize="sm" color="gray.400">Coba pilih pasar lain atau periksa data.</Text>
                  </Flex>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default TableHargaPokok;