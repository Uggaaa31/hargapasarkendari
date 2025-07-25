// src/views/Dashboard/Dashboard/components/ComplaintStatsCard.js
import React from 'react';
import { Link } from 'react-router-dom';
// Impor komponen Card, CardHeader, CardBody dari lokasi yang benar sebagai default exports
import CustomCard from 'components/Card/Card.js';
import CustomCardHeader from 'components/Card/CardHeader.js';
import CustomCardBody from 'components/Card/CardBody.js';
// ... sisa kode
// Impor komponen Chakra UI lain yang dibutuhkan
import { Heading, Text, Box, Flex } from '@chakra-ui/react';
import { MessageSquare } from 'lucide-react';

const ComplaintStatsCard = ({ data }) => {
  const displayData = data || {
    total_complaints: 125, // Dummy data
    new_complaints: 5,     // Dummy data
    in_progress_complaints: 12, // Dummy data
    resolved_complaints: 108 // Dummy data
  };

  return (
    <CustomCard className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
      <CustomCardHeader p="6" pb="2" display="flex" justifyContent="space-between" alignItems="center">
        <Heading as="h3" size="md" className="text-lg font-medium text-gray-700 dark:text-gray-200">Statistik Pengaduan</Heading>
        <MessageSquare className="h-6 w-6 text-green-500" />
      </CustomCardHeader>
      <CustomCardBody p="6" pt="0">
        {displayData ? (
          <>
            <Text fontSize="2xl" fontWeight="bold" className="text-gray-900 dark:text-gray-50">
              {displayData.total_complaints || 0}
            </Text>
            <Text fontSize="xs" className="text-gray-500 dark:text-gray-400">Total Pengaduan</Text>
            <Box fontSize="sm" className="text-gray-600 dark:text-gray-300 mt-2">
              <Text>Baru: {displayData.new_complaints || 0}</Text>
              <Text>Dalam Proses: {displayData.in_progress_complaints || 0}</Text>
              <Text>Selesai: {displayData.resolved_complaints || 0}</Text>
            </Box>
            <Link to="/dashboard/pengaduan" className="text-blue-600 hover:underline text-sm mt-2 block">
              Lihat Semua Pengaduan
            </Link>
          </>
        ) : (
          <Text className="text-gray-500 dark:text-gray-400">Memuat data statistik pengaduan...</Text>
        )}
      </CustomCardBody>
    </CustomCard>
  );
};

export default ComplaintStatsCard;
