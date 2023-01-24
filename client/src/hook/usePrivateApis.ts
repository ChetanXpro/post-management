import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const usePrivateApis = () => {
  const apiPrivateInstance = useAxiosPrivate();

  const toast = useToast({ position: "top" });

  return {};
};

export default usePrivateApis;
