import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const usePrivateApis = () => {
  const apiPrivateInstance = useAxiosPrivate();

  const toast = useToast({ position: "top" });
  const getDocs = async () => {
    const request = await apiPrivateInstance.get("/doc");
    return request.data;
  };

  interface IPayoad {
    title: string;
    description: string;
  }
  const createDoc = async (payload: IPayoad) => {
    const request = await apiPrivateInstance.post("/doc", {
      title: payload.title,
      description: payload.description,
    });

    if (request.status === 200) {
      toast({
        title: "Document created in editing stage",

        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Something went wrong",

        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    return request.data;
  };
  const getPendingDocs = async () => {
    const request = await apiPrivateInstance.get("/doc/getPending");

    return request.data;
  };
  const getEditingDocs = async () => {
    const request = await apiPrivateInstance.get("/doc/getEditing");

    return request.data;
  };
  const editCreatorDocs = async (payload: {
    title: string;
    description: string;
    documentId: string;
  }) => {
    const request = await apiPrivateInstance.put("/doc/edit", payload);
    if (request.status === 200) {
      toast({
        title: "Document edited",

        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    return request.data;
  };
  const submitDocs = async (payload: { documentId: string }) => {
    const request = await apiPrivateInstance.post("/doc/submit", payload);
    if (request.status === 200) {
      toast({
        title: "Document Submited For Review",

        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    return request.data;
  };
  const cloneDocs = async (payload: { documentId: string }) => {
    const request = await apiPrivateInstance.post("/doc/clone", {
      documentId: payload.documentId,
    });
    if (request.status === 200) {
      toast({
        title: "Document cloned",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    return request.data;
  };

  return {
    getDocs,
    createDoc,
    getPendingDocs,
    getEditingDocs,
    submitDocs,
    editCreatorDocs,
    cloneDocs,
  };
};

export default usePrivateApis;
