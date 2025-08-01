// Chakra imports
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  CreativeTimLogo,
  DocumentIcon,
  HomeIcon,
  PersonIcon,
  RocketIcon,
} from "components/Icons/Icons";
import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import routes from "routes.js";

export default function AuthNavbar(props) {
  const [open, setOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const { logo, logoText, secondary, ...rest } = props;
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  };
  // Chakra color mode
  let navbarIcon = useColorModeValue("gray.700", "gray.200");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarBg = useColorModeValue(
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  let navbarBorder = useColorModeValue(
    "1.5px solid #FFFFFF",
    "1.5px solid rgba(255, 255, 255, 0.31)"
  );
  let navbarShadow = useColorModeValue(
    "0px 7px 23px rgba(0, 0, 0, 0.05)",
    "none"
  );
  let navbarFilter = useColorModeValue(
    "none",
    "drop-shadow(0px 7px 23px rgba(0, 0, 0, 0.05))"
  );
  let navbarBackdrop = "blur(21px)";
  let bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "gray.800"
  );
  let navbarPosition = "fixed";
  let colorButton = "white";
  if (props.secondary === true) {
    navbarIcon = "white";
    navbarBg = "none";
    navbarBorder = "none";
    navbarShadow = "initial";
    navbarFilter = "initial";
    navbarBackdrop = "none";
    bgButton = "white";
    colorButton = "gray.700";
    mainText = "white";
    navbarPosition = "absolute";
  }

  // --- MODIFIKASI DIMULAI DI SINI ---

  // Variabel 'brand' yang akan tetap di kiri
  var brand = (
  <Link
    href={`${process.env.PUBLIC_URL}/#/`}
    target="_blank"
    display="flex"
    lineHeight="100%"
    fontWeight="bold"
    justifyContent="center"
    alignItems="center"
    color={mainText}
  >
    <CreativeTimLogo w="32px" h="32px" me="10px" />
    <Text fontSize="sm" mt="3px">
      {"Harga Pasar Kendari"}
    </Text>
  </Link>
  );

  var linksAuth = (
    <HStack display={{ sm: "none", lg: "flex" }}>
      <NavLink to="/admin/dashboard">
        <Button
          fontSize="sm"
          ms="0px"
          me="0px"
          px="0px"
          mr={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          leftIcon={<HomeIcon color={navbarIcon} w="12px" h="12px" me="0px" />}
        >
          <Text>Dashboard</Text>
        </Button>
      </NavLink>
      {/* TETAPKAN NavLink untuk Profile */}
      <NavLink to="/admin/profile">
        <Button
          fontSize="sm"
          ms="0px"
          me="0px"
          px="0px"
          mr={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          leftIcon={
            <PersonIcon color={navbarIcon} w="12px" h="12px" me="0px" />
          }
        >
          <Text>Profile</Text>
        </Button>
      </NavLink>
    </HStack>
  );

  return (
    <Flex
      position={navbarPosition}
      top="16px"
      left="50%"
      transform="translate(-50%, 0px)"
      background={navbarBg}
      border={navbarBorder}
      boxShadow={navbarShadow}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      borderRadius="15px"
      px="16px"
      py="22px"
      mx="auto"
      width="1044px"
      maxW="90%"
      alignItems="center"
    >
      <Flex
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        {brand}

        <HStack
          display={{ sm: "none", lg: "flex" }}
        >
          {linksAuth.props.children}
        </HStack>

        <Box
          ms={{ base: "auto", lg: "0px" }}
          display={{ base: "flex", lg: "none" }}
        >
          <SidebarResponsive
            logoText={props.logoText}
            secondary={props.secondary}
            routes={routes}
            {...rest}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

AuthNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string,
};