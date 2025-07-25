// src/views/Dashboard/Tables/components/SummaryCardsHargaPokok.js
import React from "react";
import {
  Flex,
  Text,
  useColorModeValue,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import IconBox from "components/Icons/IconBox";
import { FaDollarSign, FaArrowUp, FaArrowDown } from "react-icons/fa";

const SummaryCardsHargaPokok = ({
  avgPrice,
  highestPriceItem,
  lowestPriceItem,
  avgDailyChangeValue,
  avgDailyChangeDirection,
  formatRupiah,
  selectedMarket // Terima prop selectedMarket
}) => {
  const textColor = useColorModeValue("gray.700", "white");
  const cardBg = useColorModeValue("white", "gray.700");
  const brandColor = useColorModeValue("teal.300", "teal.300");

  const getMarketLabel = (market) => {
    return market; // Langsung gunakan nama pasar
  };

  return (
    <>
      {/* Kartu Rata-rata Harga */}
      <Card p='16px' bg={cardBg} boxShadow="md" borderRadius="xl">
        <CardBody>
          <Flex direction='row' align='center' justify='space-between' w='100%'>
            <Stat>
              <StatLabel fontSize='sm' color="gray.500" fontWeight='medium'>
                Rata-rata Harga ({getMarketLabel(selectedMarket)})
              </StatLabel>
              <StatNumber fontSize='2xl' color={textColor} fontWeight='bold' mt='4px'>
                {formatRupiah(avgPrice)}
              </StatNumber>
              {/* Ini tetap untuk perubahan harian, bisa diubah jika ingin rata-rata perubahan per pasar */}
              {avgDailyChangeValue !== 0 && (
                <StatHelpText fontSize='sm'>
                  <StatArrow type={avgDailyChangeDirection === "naik" ? "increase" : "decrease"} />
                  {Math.abs(avgDailyChangeValue)}% dari kemarin
                </StatHelpText>
              )}
            </Stat>
            <IconBox
              as='box'
              h={"50px"}
              w={"50px"}
              bg={brandColor}
              color="white"
              borderRadius="lg"
              boxShadow="sm"
            >
              <Icon as={FaDollarSign} w='24px' h='24px' />
            </IconBox>
          </Flex>
        </CardBody>
      </Card>

      {/* Kartu Barang Harga Tertinggi */}
      <Card p='16px' bg={cardBg} boxShadow="md" borderRadius="xl">
        <CardBody>
          <Flex direction='row' align='center' justify='space-between' w='100%'>
            <Stat>
              <StatLabel fontSize='sm' color="gray.500" fontWeight='medium'>
                Barang Harga Tertinggi ({getMarketLabel(selectedMarket)})
              </StatLabel>
              <StatNumber fontSize='xl' color={textColor} fontWeight='bold' mt='4px'>
                {highestPriceItem && highestPriceItem.nama ? highestPriceItem.nama : "N/A"}
              </StatNumber>
              <Text fontSize='lg' color="red.500" fontWeight='semibold'>
                {highestPriceItem && highestPriceItem.harga ? formatRupiah(highestPriceItem.harga) : formatRupiah(0)}
              </Text>
              {/* Perubahan barang tertinggi di pasar terpilih (jika ada) */}
              {highestPriceItem && highestPriceItem.perubahan !== undefined && highestPriceItem.perubahan !== 0 && (
                <StatHelpText fontSize='sm'>
                  <StatArrow type={highestPriceItem.arahPerubahan === "naik" ? "increase" : "decrease"} />
                  {Math.abs(highestPriceItem.perubahan)}%
                </StatHelpText>
              )}
            </Stat>
            <IconBox
              as='box'
              h={"50px"}
              w={"50px"}
              bg="red.400"
              color="white"
              borderRadius="lg"
              boxShadow="sm"
            >
              <Icon as={FaArrowUp} w='24px' h='24px' />
            </IconBox>
          </Flex>
        </CardBody>
      </Card>

      {/* Kartu Barang Harga Terendah */}
      <Card p='16px' bg={cardBg} boxShadow="md" borderRadius="xl">
        <CardBody>
          <Flex direction='row' align='center' justify='space-between' w='100%'>
            <Stat>
              <StatLabel fontSize='sm' color="gray.500" fontWeight='medium'>
                Barang Harga Terendah ({getMarketLabel(selectedMarket)})
              </StatLabel>
              <StatNumber fontSize='xl' color={textColor} fontWeight='bold' mt='4px'>
                {lowestPriceItem && lowestPriceItem.nama ? lowestPriceItem.nama : "N/A"}
              </StatNumber>
              <Text fontSize='lg' color="green.500" fontWeight='semibold'>
                {lowestPriceItem && lowestPriceItem.harga ? formatRupiah(lowestPriceItem.harga) : formatRupiah(0)}
              </Text>
              {/* Perubahan barang terendah di pasar terpilih (jika ada) */}
              {lowestPriceItem && lowestPriceItem.perubahan !== undefined && lowestPriceItem.perubahan !== 0 && (
                <StatHelpText fontSize='sm'>
                  <StatArrow type={lowestPriceItem.arahPerubahan === "turun" ? "decrease" : "increase"} />
                  {Math.abs(lowestPriceItem.perubahan)}%
                </StatHelpText>
              )}
            </Stat>
            <IconBox
              as='box'
              h={"50px"}
              w={"50px"}
              bg="green.400"
              color="white"
              borderRadius="lg"
              boxShadow="sm"
            >
              <Icon as={FaArrowDown} w='24px' h='24px' />
            </IconBox>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default SummaryCardsHargaPokok;