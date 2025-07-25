import {
  Box, useColorModeValue, Flex, Text
} from "@chakra-ui/react";
import React from "react";
import SidebarContent from "./SidebarContent";


function Sidebar(props) {
  const mainPanel = React.useRef();
  let variantChange = "0.2s linear";

  const { logoText, routes, sidebarVariant, isLoggedIn } = props;

  let sidebarBg = "none";
  let sidebarRadius = "0px";
  let sidebarMargins = "0px";
  if (sidebarVariant === "opaque") {
    sidebarBg = useColorModeValue("white", "gray.700");
    sidebarRadius = "16px";
    sidebarMargins = "16px 0px 16px 16px";
  }

  // SIDEBAR
  return (
    <Box ref={mainPanel}>
      <Box display={{ sm: "none", xl: "block" }} position="fixed" top="0px" left="0px" height="100%">
        <Box
          bg={sidebarBg}
          transition={variantChange}
          w="290px"
          maxW="290px"
          m="0px"
          h="100%"
          ps="20px"
          pe="20px"
          borderRadius={sidebarRadius}
          pt="px"
        >
          <SidebarContent
            routes={routes}
            logoText={logoText}
            sidebarVariant={sidebarVariant}
            isLoggedIn={isLoggedIn}
            pt="0px"
            pb="0px"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;