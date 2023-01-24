import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const usePrivateApis = () => {
  const apiPrivateInstance = useAxiosPrivate();

  const toast = useToast({ position: "top" });
  const getDocs = async()=>{
  const request = await apiPrivateInstance.get('/doc')
  

  return request.data
  }

  return {
    getDocs
  };
};

export default usePrivateApis;
