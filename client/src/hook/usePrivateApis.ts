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
  const editCloneDocs = async (payload: {
    title: string;
    description: string;
    cloneDocumentId: string;
  }) => {
    const request = await apiPrivateInstance.put("/doc/editclone", payload);
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

  const getCloneDocs = async () => {
    const request = await apiPrivateInstance.get("/doc/getClone");

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
  const submitClone = async (payload: { cloneDocumentId: string }) => {
    const request = await apiPrivateInstance.post("/doc/submitclone", {
      cloneDocumentId: payload.cloneDocumentId,
    });
    if (request.status === 200) {
      toast({
        title: "Submit for approval",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    return request.data;
  };
  const approveClone = async (payload: { cloneDocumentId: string }) => {
    const request = await apiPrivateInstance.post("/doc/admin/approveclone", {
      cloneDocumentId: payload.cloneDocumentId,
    });
    if (request.status === 200) {
      toast({
        title: "Approved",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    return request.data;
  };
  const rejectClone = async (payload: { cloneDocumentId: string }) => {
    const request = await apiPrivateInstance.post("/doc/admin/rejectclone", {
      cloneDocumentId: payload.cloneDocumentId,
    });
    if (request.status === 200) {
      toast({
        title: "Rejected",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    return request.data;
  };

  const rejectDocs = async (payload: { documentId: string }) => {
    const request = await apiPrivateInstance.post("/doc/admin/reject", payload);
    if (request.status === 200) {
      toast({
        title: "Rejected",

        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    return request.data;
  };
  const approveDocs = async (payload: { documentId: string }) => {
    const request = await apiPrivateInstance.post("/doc/admin/approve", payload);
    if (request.status === 200) {
      toast({
        title: "Approved",

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
    submitClone,
    cloneDocs,
    getCloneDocs,
    approveClone,
    editCloneDocs,
    rejectClone,
    rejectDocs,
    approveDocs,
  };
};

export default usePrivateApis;
