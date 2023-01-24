import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { login, signup } from "../../Api/api";

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

const Signup = () => {
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [validName, setValidName] = useState(false);
  const [success, setSuccess] = useState(false);
  const from = location?.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const toast = useToast({ position: "top" });

  
  useEffect(() => {
    setValidName(PWD_REGEX.test(password));
  }, [password]);

  const { isLoading, isError, error, mutate } = useMutation(signup, {
    onSuccess: (data) => {
      toast({
        title: "Account created",

        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate("/signin");
      }, 400);
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const payload = {
      name: name,
      email: email,
      password,
    };
    mutate(payload);
  };
  return (
    <Flex h="100vh" bg={"#2b2b2b"} justifyContent="center">
      <Flex
        marginX="6"
        marginY={"6"}
        w={[300, 300, 400]}
        flexDirection={"column"}
        mt={"36"}
      >
        <form onSubmit={handleSubmit}>
          <Text
            textAlign={"center"}
            color="white"
            fontFamily={"heading"}
            fontSize="2xl"
            mb={"6"}
          >
            Create your account
          </Text>

          <FormControl mb={"4"} isInvalid={validName}>
            <Input
              type={"name"}
              h="10"
              color={"whiteAlpha.900"}
              autoComplete="true"
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
            />
          </FormControl>
          <FormControl mb={"4"} isInvalid={false}>
            <Input
              type={"email"}
              h="10"
              color={"whiteAlpha.900"}
              autoComplete="true"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </FormControl>
          <FormControl isInvalid={false}>
            <Input
              type={"password"}
              h={"10"}
              autoComplete="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              color={"whiteAlpha.900"}
              placeholder="password"
            />
          </FormControl>
          <p
            style={{
              height: "5px",
              marginBottom: "12px",
              marginTop: "6px",
              color: "red",
            }}
          >
            {isError ? `${error?.data?.message}` : ""}
          </p>

          <Button
            isLoading={isLoading}
            loadingText="Creating account"
            width={"full"}
            h="12"
            colorScheme={`${success ? "green" : "teal"}`}
            mt={"4"}
            onClick={handleSubmit}
          >
            {success ? "Account Created" : "Sign up"}
          </Button>
        </form>
        <Flex mt={"4"} justifyContent="center">
          <span
            style={{ textAlign: "center", marginRight: "6px", color: "wheat" }}
          >
            Already have an account ?{" "}
          </span>
          <Link className="text-blue-400" to={"/signin"}>
            Sign in
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Signup;
