// src/views/Dashboard/Dashboard/components/HargaPokokSummaryCard.js
import React from 'react';
import { Link } from 'react-router-dom';
// Impor komponen Card, CardHeader, CardBody dari lokasi yang benar sebagai default exports
import CustomCard from 'components/Card/Card.js';
import CustomCardHeader from 'components/Card/CardHeader.js';
import CustomCardBody from 'components/Card/CardBody.js';
// ... sisa kode
// Impor komponen Chakra UI lain yang dibutuhkan
import { Heading, Text, Box, Flex } from '@chakra-ui/react';
import { DollarSign } from 'lucide-react';

const HargaPokokSummaryCard = ({ data }) => {
  const displayData = data || {
    average_price: 18500, // Dummy data
    last_updated: '2025-07-24' // Dummy data
  };

  return (
    <CustomCard className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
      <CustomCardHeader p="6" pb="2" display="flex" justifyContent="space-between" alignItems="center">
        <Heading as="h3" size="md" className="text-lg font-medium text-gray-700 dark:text-gray-200">Ringkasan Harga Pokok</Heading>
        <DollarSign className="h-6 w-6 text-blue-500" />
      </CustomCardHeader>
      <CustomCardBody p="6" pt="0">
        {displayData ? (
          <>
            <Text fontSize="2xl" fontWeight="bold" className="text-gray-900 dark:text-gray-50">
              Rp {displayData.average_price ? displayData.average_price.toLocaleString('id-ID') : 'N/A'}
            </Text>
            <Text fontSize="xs" className="text-gray-500 dark:text-gray-400">Rata-rata Harga Terkini</Text>
            <Link to="/dashboard/harga" className="text-blue-600 hover:underline text-sm mt-2 block">
              Lihat Detail Harga
            </Link>
          </>
        ) : (
          <Text className="text-gray-500 dark:text-gray-400">Memuat data harga pokok...</Text>
        )}
      </CustomCardBody>
    </CustomCard>
  );
};

export default HargaPokokSummaryCard;