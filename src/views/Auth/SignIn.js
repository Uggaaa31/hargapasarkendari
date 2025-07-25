import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Switch,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  Stack,
  Link,
  Checkbox,
} from "@chakra-ui/react";

import signInImage from "assets/img/signInImage.png";

function SignIn() {
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const headingColor = useColorModeValue("gray.700", "white");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password tidak boleh kosong.");
      return;
    }

    if (email === "admin@example.com" && password === "password") {
      localStorage.setItem("userToken", "my_super_secure_jwt_token_123");
      localStorage.setItem("userName", "Admin User");

      history.push("/admin/dashboard");
    } else {
      setError("Email atau password salah. Silakan coba lagi.");
    }
  };

  return (
    <Flex position='relative' mb='40px'>
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        justifyContent='space-between'
        mb='30px'
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction='column'
            w='100%'
            background='transparent'
            p='48px'
            mt={{ md: "150px", lg: "170px", base: "110px" }}
            as="form"
            onSubmit={handleSubmit}
          >
            <Heading color={headingColor} fontSize='32px' mb='10px'>
              Welcome Back
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColor}
              fontWeight='bold'
              fontSize='14px'
            >
              Enter your email and password to sign in
            </Text>

            {error && (
              <Alert status='error' borderRadius='15px' mb='24px'>
                <AlertIcon />
                {error}
              </Alert>
            )}

            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Email
              </FormLabel>
              <Input
                borderRadius='15px'
                mb='24px'
                fontSize='sm'
                type='email'
                placeholder='Your email address'
                size='lg'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
                Password
              </FormLabel>
              <Input
                borderRadius='15px'
                mb='36px'
                fontSize='sm'
                type='password'
                placeholder='Your password'
                size='lg'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControl display='flex' alignItems='center'>
                <Switch id='remember-login' colorScheme='teal' me='10px' />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  ms='1'
                  fontWeight='normal'
                >
                  Remember me
                </FormLabel>
              </FormControl>
              <Button
                fontSize='17px'
                type='submit'
                bg='teal.300'
                w='100%'
                h='45'
                mb='20px'
                color='white'
                mt='20px'
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}
              >
                SIGN IN
              </Button>
            </FormControl>
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'
            >
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX='hidden'
          h='100%'
          w='40vw'
          position='absolute'
          right='0px'
        >
          <Box
            bgImage={signInImage}
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='50%'
            position='absolute'
            borderBottomLeftRadius='20px'
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;