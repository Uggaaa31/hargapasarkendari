// src/components/Charts/PieChartComponent.js
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
// import monthlyPercentageChartData from "../../data/monthlyPercentageChartData"; // Data tidak lagi diimpor di sini

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

// Komponen ini sekarang menerima 'chartData' sebagai prop
function PieChartComponent({ chartData }) {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
            color: 'gray.500', // Warna label legend
        }
      },
      title: {
        display: false,
      },
    },
  };

  if (!chartData || !chartData.labels || chartData.labels.length === 0) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100%" color="gray.500">
        Tidak ada data untuk periode ini.
      </Flex>
    );
  }

  return (
    <Box width="100%" height="100%" p="4"> {/* Hapus border */}
      <Pie data={chartData} options={chartOptions} />
    </Box>
  );
}

export default PieChartComponent;