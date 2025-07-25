// src/components/Charts/BarChartComponent.js
import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend, // Tetap import Legend karena Anda mendaftarkannya, hanya menyembunyikannya di options
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend // Tetap daftarkan Legend
);


// Komponen ini sekarang menerima 'chartData' sebagai prop
function BarChartComponent({ chartData }) {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // <<< === PERUBAHAN UTAMA DI SINI ===
        // position: 'right', // Ini tidak lagi relevan jika display: false
        // labels: {
        //     color: 'gray.500',
        // }
      },
      title: {
        display: false,
      },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                color: 'gray.500',
            },
            grid: {
                borderColor: 'gray.300',
                color: 'gray.200',
            }
        },
        x: {
            ticks: {
                autoSkip: false,
                maxRotation: 45,
                minRotation: 45,
                color: 'gray.500',
            },
            grid: {
                borderColor: 'gray.300',
                color: 'transparent',
            }
        }
    }
  };

  if (!chartData || !chartData.labels || chartData.labels.length === 0) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100%" color="gray.500">
        Tidak ada data untuk periode ini.
      </Flex>
    );
  }

  return (
    <Box width="100%" height="100%" p="4">
      <Bar data={chartData} options={chartOptions} />
    </Box>
  );
}

export default BarChartComponent;