import { Button, Flex, Link, Text } from "@chakra-ui/react";
import SidebarHelpImage from "assets/img/SidebarHelpImage.png";
import React from "react";

export function SidebarHelp(props) {
  const { children, ...rest } = props;

  return (
    <Flex
      borderRadius="15px"
      flexDirection="column"
      bgImage={SidebarHelpImage}
      justifyContent="flex-start"
      alignItems="start"
      boxSize="border-box"
      p="16px"
      h="auto"
      // w="100%" // <--- Komentar ini
      w="calc(100% - 40px)" // <--- Ganti dengan lebar yang Anda inginkan (misal, 100% dikurangi 40px untuk padding 20px di kiri dan kanan)
      mx="auto" // <--- Pusatkan jika lebarnya kurang dari 100%
      {...rest}
    >
      <Text fontSize="sm" color="white" fontWeight="bold">
        Need help?
      </Text>
      <Text fontSize="xs" color="white" mb="10px">
        Contact us via WhatsApp
      </Text>

      <Link
        w="100%"
        href="https://wa.me/6281341185188?text=Halo%20admin%2C%20saya%20perlu%20bantuan%20terkait%20dashboard"
        isExternal
      >
        <Button
          fontSize="12px"
          fontWeight="bold"
          w="100%"
          bg="white"
          _hover="none"
          _active={{
            bg: "white",
            transform: "none",
            borderColor: "transparent",
          }}
          _focus={{
            boxShadow: "none",
          }}
          color="black"
        >
          Click Here
        </Button>
      </Link>
    </Flex>
  );
}

export default SidebarHelp;