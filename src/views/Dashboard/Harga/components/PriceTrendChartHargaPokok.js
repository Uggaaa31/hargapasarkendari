// src/views/Dashboard/Tables/components/PriceTrendChartHargaPokok.js
import React from "react";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, defs, stop,
} from 'recharts';

// Tambahkan chartTitle ke props
const PriceTrendChartHargaPokok = ({ data, chartTitle, formatRupiah }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const cardBg = useColorModeValue("white", "gray.700");
  const gridColor = useColorModeValue("gray.200", "gray.600");
  const axisColor = useColorModeValue("gray.500", "gray.400");
  const lineColor = useColorModeValue("#4FD1C5", "#2EE4BE");
  const areaFillColor = useColorModeValue("#4FD1C5", "#2EE4BE");

  return (
    <Card p='16px' bg={cardBg} boxShadow="xl" borderRadius="xl">
      <CardHeader p='12px 0px 12px 0px'>
        <Text fontSize='lg' color={textColor} fontWeight='bold'>
          {chartTitle} {/* Judul dinamis */}
        </Text>
      </CardHeader>
      <CardBody px='0' py='0'>
        <Flex w="100%" h="300px">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorHarga" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={areaFillColor} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={areaFillColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="date"
                stroke={axisColor}
                tickLine={false}
                axisLine={false}
                fontSize="sm"
              />
              <YAxis
                tickFormatter={(value) => formatRupiah(value)}
                domain={['dataMin - 100', 'dataMax + 100']}
                stroke={axisColor}
                tickLine={false}
                axisLine={false}
                fontSize="sm"
              />
              <Tooltip
                formatter={(value) => formatRupiah(value)}
                labelStyle={{ color: useColorModeValue("gray.700", "white"), fontWeight: 'bold' }}
                contentStyle={{
                  backgroundColor: useColorModeValue("white", "gray.800"),
                  border: useColorModeValue("1px solid #E2E8F0", "1px solid #4A5568"),
                  borderRadius: "md",
                  padding: "10px"
                }}
                itemStyle={{ color: useColorModeValue("gray.700", "white") }}
              />
              <Legend wrapperStyle={{ paddingTop: '15px' }} iconType="circle" />
              <Area
                type="monotone"
                dataKey="harga"
                stroke={lineColor}
                fillOpacity={1}
                fill="url(#colorHarga)"
                name="Harga (Rp)"
                strokeWidth={3}
                dot={{ stroke: lineColor, strokeWidth: 2, r: 4, fill: '#fff' }}
                activeDot={{ r: 6, strokeWidth: 2, fill: lineColor, stroke: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default PriceTrendChartHargaPokok;