import {
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
  Box, Button, Flex, Link, Stack, Text, useColorModeValue, Icon,
} from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";
import { CreativeTimLogo } from "components/Icons/Icons";
import { Separator } from "components/Separator/Separator";
import { SidebarHelp } from "components/Sidebar/SidebarHelp";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const SidebarContent = ({ logoText, routes, isLoggedIn, pt }) => {
  let location = useLocation();

  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  const createLinks = (routesList) => {
    const activeBg = useColorModeValue("white", "gray.700");
    const inactiveBg = useColorModeValue("white", "gray.700");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");

    return routesList.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.category) {
        const filteredViews = prop.views.filter(view => {
          if (view.name === "Sign In") {
            return !isLoggedIn;
          }
          return true;
        });

        if (filteredViews.length === 0) {
          return null;
        }

        return (
          <AccordionItem key={key} border="none">
            <h2>
              <AccordionButton
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p="12px 20px"
                borderRadius="15px"
                _hover={{ bg: "transparent" }}
                _focus={{ boxShadow: "none" }}
              >
                <Text color={activeColor} fontWeight="bold" fontSize="sm" my="auto">
                  {document.documentElement.dir === "rtl" ? prop.rtlName : prop.name}
                </Text>
                <AccordionIcon color={inactiveColor} />
              </AccordionButton>
            </h2>
            <AccordionPanel pe="0px" ps="0px" pb="0px">
              <Stack direction="column" mb="12px">
                {createLinks(filteredViews)}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        );
      }
      return (
        <NavLink to={prop.layout + prop.path} key={prop.name}>
          {activeRoute(prop.layout + prop.path) === "active" ? (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg={activeBg}
              mb={{ xl: "12px" }}
              mx={{ xl: "auto" }}
              ps={{ sm: "10px", xl: "16px" }}
              py="12px"
              borderRadius="15px"
              _hover="none"
              w="100%"
              _active={{ bg: "inherit", transform: "none", borderColor: "transparent" }}
              _focus={{ boxShadow: "none" }}
            >
              <Flex>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox bg="teal.300" color="white" h="30px" w="30px" me="12px">
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={activeColor} my="auto" fontSize="sm">
                  {document.documentElement.dir === "rtl" ? prop.rtlName : prop.name}
                </Text>
              </Flex>
            </Button>
          ) : (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg="transparent"
              mb={{ xl: "12px" }}
              mx={{ xl: "auto" }}
              py="12px"
              ps={{ sm: "10px", xl: "16px" }}
              borderRadius="15px"
              _hover="none"
              w="100%"
              _active={{ bg: "inherit", transform: "none", borderColor: "transparent" }}
              _focus={{ boxShadow: "none" }}
            >
              <Flex>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox bg={inactiveBg} color="teal.300" h="30px" w="30px" me="12px">
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={inactiveColor} my="auto" fontSize="sm">
                  {document.documentElement.dir === "rtl" ? prop.rtlName : prop.name}
                </Text>
              </Flex>
            </Button>
          )}
        </NavLink>
      );
    });
  };

  const links = <>{createLinks(routes)}</>;

  return (
    <Flex
      direction="column"
      height="100%"
      pt={pt}
      pb={"20px"}
    >
      <Box mb="0px">
        <Link
          href={`${process.env.PUBLIC_URL}/#/`}
          target="_blank"
          display="flex"
          lineHeight="100%"
          mb="0px"
          fontWeight="bold"
          justifyContent="center"
          alignItems="center"
          fontSize="11px"
        >
          <CreativeTimLogo w="32px" h="32px" me="10px" />
          <Text fontSize="sm" mt="3px">
            {logoText}
          </Text>
        </Link>
        <Separator mb="20px" mt="10px"></Separator>
      </Box>

      <Stack direction="column" mb="0px" overflowY="auto" flexGrow={1}>
        <Accordion allowMultiple defaultIndex={[0, 1, 2, 3]}>
          {links}
        </Accordion>
      </Stack>

      <Box pt="20px" pb="40px" px="5px">
        <SidebarHelp />
      </Box>
    </Flex>
  );
};

export default SidebarContent;