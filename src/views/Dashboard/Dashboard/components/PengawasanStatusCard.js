// src/views/Dashboard/Dashboard/components/PengawasanStatusCard.js
import React from 'react';
import { Link } from 'react-router-dom';
// Impor komponen Card, CardHeader, CardBody dari lokasi yang benar sebagai default exports
import CustomCard from 'components/Card/Card.js';
import CustomCardHeader from 'components/Card/CardHeader.js';
import CustomCardBody from 'components/Card/CardBody.js';
// ... sisa kode
// Impor komponen Chakra UI lain yang dibutuhkan
import { Heading, Text, Box, Flex } from '@chakra-ui/react';
import { ShieldCheck } from 'lucide-react';

const PengawasanStatusCard = ({ data }) => {
  const displayData = data || {
    active_supervisions: 7,   // Dummy data
    pending_reviews: 3,       // Dummy data
    completed_today: 1        // Dummy data
  };

  return (
    <CustomCard className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
      <CustomCardHeader p="6" pb="2" display="flex" justifyContent="space-between" alignItems="center">
        <Heading as="h3" size="md" className="text-lg font-medium text-gray-700 dark:text-gray-200">Status Pengawasan</Heading>
        <ShieldCheck className="h-6 w-6 text-purple-500" />
      </CustomCardHeader>
      <CustomCardBody p="6" pt="0">
        {displayData ? (
          <>
            <Text fontSize="2xl" fontWeight="bold" className="text-gray-900 dark:text-gray-50">
              {displayData.active_supervisions || 0}
            </Text>
            <Text fontSize="xs" className="text-gray-500 dark:text-gray-400">Pengawasan Aktif</Text>
            <Box fontSize="sm" className="text-gray-600 dark:text-gray-300 mt-2">
              <Text>Perlu Ditinjau: {displayData.pending_reviews || 0}</Text>
              <Text>Selesai Hari Ini: {displayData.completed_today || 0}</Text>
            </Box>
            <Link to="/dashboard/pengawasan" className="text-blue-600 hover:underline text-sm mt-2 block">
              Lihat Detail Pengawasan
            </Link>
          </>
        ) : (
          <Text className="text-gray-500 dark:text-gray-400">Memuat data pengawasan...</Text>
        )}
      </CustomCardBody>
    </CustomCard>
  );
};

export default PengawasanStatusCard;
