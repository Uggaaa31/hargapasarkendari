import {
  Button,
  Flex,
  InputGroup,
  Text,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";

import SidebarResponsive from "components/Sidebar/SidebarResponsive";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import routes from "routes.js";
import { FaUserCircle } from "react-icons/fa";

import { MdLogout } from "react-icons/md";

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;

  let mainTeal = useColorModeValue("teal.300", "teal.300");
  let inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  let searchIcon = useColorModeValue("gray.700", "gray.200");

  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const name = localStorage.getItem("userName");
    if (token) {
      setIsLoggedIn(true);
      setUserName(name || "Pengguna");
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, []);

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }
  const settingsRef = React.useRef();

  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <InputGroup
        cursor="pointer"
        bg={inputBg}
        borderRadius="15px"
        w={{
          sm: "128px",
          md: "200px",
        }}
        me={{ sm: "auto", md: "20px" }}
        _focus={{
          borderColor: { mainTeal },
        }}
        _active={{
          borderColor: { mainTeal },
        }}
      >
      </InputGroup>

      {isLoggedIn ? (
        <Flex alignItems="center">
          <Text
            display={{ base: "none", md: "flex" }}
            color={mainText}
            fontWeight="bold"
            fontSize="sm"
            me="10px"
          >
            Halo, {userName}!
          </Text>
          <Button
            ms="0px"
            px="0px"
            me={{ sm: "2px", md: "16px" }}
            color={navbarIcon}
            variant="transparent-with-icon"
            onClick={handleLogout}
            rightIcon={
              document.documentElement.dir ? (
                ""
              ) : (
                <Icon as={MdLogout} color={navbarIcon} w="22px" h="22px" me="0px" />
              )
            }
            leftIcon={
              document.documentElement.dir ? (
                <Icon as={MdLogout} color={navbarIcon} w="22px" h="22px" me="0px" />
              ) : (
                ""
              )
            }
          >
            <Text display={{ sm: "none", md: "flex" }}>Logout</Text>
          </Button>
        </Flex>
      ) : (
        <NavLink to="/auth/signin">
        </NavLink>
      )}

      <SidebarResponsive
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        {...rest}
      />
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
  logoText: PropTypes.string,
};