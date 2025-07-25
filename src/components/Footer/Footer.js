/*eslint-disable*/
import React from "react";
import { Box, Flex, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { AiOutlineCopyright } from "react-icons/ai";

export default function Footer() {
  // Sesuaikan warna dengan mode gelap/terang
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      width="100%"
      bg={bgColor}
      px={{ base: "20px", md: "40px" }}
      py="14px"
      borderTop="1px solid"
      borderColor={borderColor}
      mt="auto"
    >
      <Flex
        align="center"
        justify="flex-start"
        gap="10px"
      >
        <Icon as={AiOutlineCopyright} color={textColor} boxSize="18px" />
        <Text fontSize="sm" color={textColor} fontWeight="medium">
          2025 Nama Kantor.
        </Text>
      </Flex>
    </Box>
  );
}
