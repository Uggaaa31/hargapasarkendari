import React from "react";
import {
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";

const ManifestTable = ({ data, indexOfFirstRow }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const cardBg = useColorModeValue("white", "gray.700");
  const headerColor = useColorModeValue("gray.500", "gray.400");

  const tableRowEvenBg = useColorModeValue("gray.50", "gray.700");
  const tableRowOddBg = useColorModeValue("white", "gray.800");
  const tableRowHoverBg = useColorModeValue("gray.100", "gray.600");


  if (!data || data.length === 0) {
    return (
      <Card p='20px' bg={cardBg} boxShadow="lg" borderRadius="xl">
        <CardBody>
          <Flex justify="center" align="center" py="20px" direction="column">
            <Text fontSize="md" color="gray.500">Tidak ada data manifest yang ditemukan.</Text>
            <Text fontSize="sm" color="gray.400">Coba ubah filter atau periksa data Anda.</Text>
          </Flex>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card p='20px' bg={cardBg} boxShadow="lg" borderRadius="xl">
      <CardBody>
        <TableContainer overflowX="auto">
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px">
                <Th
                  color={headerColor}
                  borderBottomColor={borderColor}
                  fontSize="xs"
                  textTransform="uppercase"
                  fontWeight="bold"
                  whiteSpace="nowrap"
                  p="10px 12px"
                  minW="40px"
                >
                  No
                </Th>
                <Th
                  color={headerColor}
                  borderBottomColor={borderColor}
                  fontSize="xs"
                  textTransform="uppercase"
                  fontWeight="bold"
                  whiteSpace="nowrap"
                  p="10px 12px"
                  minW="120px"
                >
                  Consignee
                </Th>
                <Th
                  color={headerColor}
                  borderBottomColor={borderColor}
                  fontSize="xs"
                  textTransform="uppercase"
                  fontWeight="bold"
                  whiteSpace="normal"
                  p="10px 12px"
                  minW="90px"
                >
                  Jenis
                </Th>
                <Th
                  color={headerColor}
                  borderBottomColor={borderColor}
                  fontSize="xs"
                  textTransform="uppercase"
                  fontWeight="bold"
                  whiteSpace="nowrap"
                  p="10px 12px"
                  minW="60px"
                >
                  Jumlah
                </Th>
                <Th
                  color={headerColor}
                  borderBottomColor={borderColor}
                  fontSize="xs"
                  textTransform="uppercase"
                  fontWeight="bold"
                  whiteSpace="nowrap"
                  p="10px 12px"
                  minW="80px"
                >
                  Harga I (Rp)
                </Th>
                <Th
                  color={headerColor}
                  borderBottomColor={borderColor}
                  fontSize="xs"
                  textTransform="uppercase"
                  fontWeight="bold"
                  whiteSpace="nowrap"
                  p="10px 12px"
                  minW="80px"
                >
                  Harga II (Rp)
                </Th>
                <Th
                  color={headerColor}
                  borderBottomColor={borderColor}
                  fontSize="xs"
                  textTransform="uppercase"
                  fontWeight="bold"
                  whiteSpace="nowrap"
                  p="10px 12px"
                  minW="80px"
                >
                  Harga III (Rp)
                </Th>
                <Th
                  color={headerColor}
                  borderBottomColor={borderColor}
                  fontSize="xs"
                  textTransform="uppercase"
                  fontWeight="bold"
                  whiteSpace="normal"
                  p="10px 12px"
                  minW="100px"
                >
                  JPT
                </Th>
                <Th
                  color={headerColor}
                  borderBottomColor={borderColor}
                  fontSize="xs"
                  textTransform="uppercase"
                  fontWeight="bold"
                  whiteSpace="normal"
                  p="10px 12px"
                  minW="100px"
                >
                  Kabupaten Tujuan
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, index) => (
                <Tr key={item.no || index} _hover={{ bg: useColorModeValue("gray.50", "gray.800") }} transition="background-color 0.2s ease-in-out">
                  <Td
                    fontSize={{ base: "xs", md: "sm" }} // Diubah dari "xx-small" ke "xs"
                    borderColor={borderColor}
                    p="8px 12px"
                    fontWeight="medium"
                    whiteSpace="nowrap"
                  >
                    {(indexOfFirstRow || 0) + index + 1}
                  </Td>
                  <Td
                    fontSize={{ base: "xs", md: "sm" }} // Diubah dari "xx-small" ke "xs"
                    borderColor={borderColor}
                    p="8px 12px"
                    fontWeight="medium"
                    whiteSpace="normal"
                    sx={{ wordBreak: "break-word" }}
                  >
                    {item.consignee}
                  </Td>
                  <Td
                    fontSize={{ base: "xs", md: "sm" }} // Diubah dari "xx-small" ke "xs"
                    borderColor={borderColor}
                    p="8px 12px"
                    fontWeight="normal"
                    whiteSpace="normal"
                    sx={{ wordBreak: "break-word" }}
                  >
                    {item.jenis.split("\n").map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx < item.jenis.split("\n").length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </Td>
                  <Td
                    fontSize={{ base: "xs", md: "sm" }} // Diubah dari "xx-small" ke "xs"
                    borderColor={borderColor}
                    p="8px 12px"
                    fontWeight="medium"
                    whiteSpace="nowrap"
                  >
                    {item.jumlah}
                  </Td>
                  <Td
                    fontSize={{ base: "xs", md: "sm" }} // Diubah dari "xx-small" ke "xs"
                    borderColor={borderColor}
                    p="8px 12px"
                    fontWeight="semibold"
                    whiteSpace="nowrap"
                  >
                    {item.harga1}
                  </Td>
                  <Td
                    fontSize={{ base: "xs", md: "sm" }} // Diubah dari "xx-small" ke "xs"
                    borderColor={borderColor}
                    p="8px 12px"
                    fontWeight="semibold"
                    whiteSpace="nowrap"
                  >
                    {item.harga2}
                  </Td>
                  <Td
                    fontSize={{ base: "xs", md: "sm" }} // Diubah dari "xx-small" ke "xs"
                    borderColor={borderColor}
                    p="8px 12px"
                    fontWeight="semibold"
                    whiteSpace="nowrap"
                  >
                    {item.harga3}
                  </Td>
                  <Td
                    fontSize={{ base: "xs", md: "sm" }} // Diubah dari "xx-small" ke "xs"
                    borderColor={borderColor}
                    p="8px 12px"
                    fontWeight="normal"
                    whiteSpace="normal"
                    sx={{ wordBreak: "break-word" }}
                  >
                    {item.jpt}
                  </Td>
                  <Td
                    fontSize={{ base: "xs", md: "sm" }} // Diubah dari "xx-small" ke "xs"
                    borderColor={borderColor}
                    p="8px 12px"
                    fontWeight="normal"
                    whiteSpace="normal"
                    sx={{ wordBreak: "break-word" }}
                  >
                    {item.kabupaten_tujuan}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};

export default ManifestTable;