import {
  Text,
  Button as CButton,
  Divider,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  FormControl,
  FormLabel,
  Input,
  DrawerFooter,
  useToast,
  useDisclosure,
  Textarea,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Center,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Highlight,
} from "@chakra-ui/react";
import React, { useReducer, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { useNavigate } from "react-router-dom";
import usePrivateApis from "../../hook/usePrivateApis";
import Loader from "../Loader/Loader";
import NoData from "../NoData/NoData";
interface updateJournalEntryVariables {
  title: string;
  description: string;
}

const Profile = () => {
  const queryClient = useQueryClient();

  const {
    createDoc,
    editCreatorDocs,
    editCloneDocs,
    getPendingDocs,
    getCloneDocs,
    getEditingDocs,
    submitClone,
    submitDocs,
  } = usePrivateApis();
  const [createTitle, setCreateTitle] = useState<any>("");
  const [createDescription, setCreateDescription] = useState<any>("");
  const [editTitle, setEditTitle] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [editDocumentId, setEditDocumentId] = useState<string>("");
  const [editCloneDocumentId, setEditCloneDocumentId] = useState<string>("");

  const [editCloneTitle, setEditCloneTitle] = useState<string>("");
  const [editCloneDescription, setEditCloneDescription] = useState<string>("");

  const {
    isOpen: isAlertOpen,
    onOpen: alertOpen,
    onClose: alertClose,
  } = useDisclosure();
  const cancelRef = useRef() as any;
  const {
    isOpen: isDrawerOpen,
    onOpen: open,
    onClose: close,
  } = useDisclosure();

  const {
    isLoading,
    data,
    refetch: pendingRefetch,
  } = useQuery("pending", getPendingDocs);
  console.log(data);
  const {
    isLoading: loading,
    data: editDocsList,
    refetch,
  } = useQuery("editing", getEditingDocs);
  const { data: editCloneList, refetch: refetchCloneList } = useQuery(
    "cloneEdit",
    getCloneDocs
  );

  const navigate = useNavigate();
  const btnReff = useRef() as any;
  const btnRef = useRef() as any;
  const cloneRef = useRef() as any;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCloneOpen,
    onOpen: openClone,
    onClose: closeClone,
  } = useDisclosure();

  const toast = useToast({ position: "top" });

  const { mutate } = useMutation(createDoc, {
    onSuccess: () => {
      queryClient.invalidateQueries("editing");
      refetch();
      close();
      setCreateTitle("");
      setCreateDescription("");
    },
  });
  // const { mutate } = useMutation(createDoc);
  const { mutate: editDoc } = useMutation(editCreatorDocs, {
    onSuccess: () => {
      queryClient.invalidateQueries("editing");
      refetch();
      onClose();
      setEditDescription("");
      setEditTitle("");
      setEditDocumentId("");
    },
  });
  const { mutate: editCloneDoc } = useMutation(editCloneDocs, {
    onSuccess: () => {
      queryClient.invalidateQueries("cloneEdit");
      refetchCloneList();
      closeClone();
      setEditCloneDescription("");
      setEditCloneTitle("");
      setEditCloneDocumentId("");
    },
  });
  const { mutate: submitMutate } = useMutation(submitDocs, {
    onSuccess: () => {
      queryClient.invalidateQueries("editing");
      refetch();
      queryClient.invalidateQueries("pending");
      pendingRefetch();
      alertClose();
      setSubmitDocumentId("");
    },
  });
  const { mutate: submitCloneMutate } = useMutation(submitClone, {
    onSuccess: () => {
      queryClient.invalidateQueries("cloneEdit");
      refetchCloneList();
      queryClient.invalidateQueries("pending");
      pendingRefetch();
    },
  });
  const handleEdit = () => {
    if (!editTitle || !editDescription || !editDocumentId) {
      return toast({
        title: "Please fill all inputs",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    const payload = {
      title: editTitle,
      description: editDescription,
      documentId: editDocumentId,
    };
    editDoc(payload);
  };
  const handleCloneEdit = () => {
    if (!editCloneTitle || !editCloneDescription || !editCloneDocumentId) {
      return toast({
        title: "Please fill all inputs",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    const payload = {
      title: editCloneTitle,
      description: editCloneDescription,
      cloneDocumentId: editCloneDocumentId,
    };
    editCloneDoc(payload);
  };

  const handleCreate = () => {
    if (!createTitle || !createDescription) {
      return toast({
        title: "Please fill all inputs",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    mutate({ title: createTitle, description: createDescription });
  };
  const [submitDocumentId, setSubmitDocumentId] = useState("");
  const handleSubmit = () => {
    const payload = { documentId: submitDocumentId };
    submitMutate(payload);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col relative  items-center">
      {/* <div className="flex absolute flex-col  top-2 justify-center w-full items-end"> */}

      <Tabs
        variant="soft-rounded"
        mt={"3"}
        h={"full"}
        w="full"
        colorScheme="green"
      >
        <TabList px={"6"}>
          <div className="flex  mb-4   w-full">
            <Tab>Editing</Tab>
            <Tab>Pending</Tab>
            <Tab>Clone</Tab>
          </div>
          <Button
            className="w-30"
            ref={btnReff}
            colorScheme="teal"
            onClick={open}
          >
            Create New Doc
          </Button>
        </TabList>
        <TabPanels pl={"10"}>
          <TabPanel>
            <div className="flex flex-col items-center justify-center   w-full ">
              <div className="w-full flex flex-wrap gap-4  ">
                {editDocsList && editDocsList.editingDocs.length > 0 ? (
                  editDocsList.editingDocs.map((i: any) => (
                    <Card key={i._id} w={"80"}>
                      <CardHeader>
                        <Heading size="sm">{i.title}</Heading>
                      </CardHeader>
                      <CardBody>
                        <Text>{i.description}</Text>
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        <Center width="full" justifyContent={"space-between"}>
                          <Button
                            ref={btnRef}
                            colorScheme="teal"
                            onClick={() => {
                              setEditDocumentId(i.documentId);
                              setEditDescription(i.description);
                              setEditTitle(i.title);
                              onOpen();
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            colorScheme="blue"
                            onClick={() => {
                              alertOpen();
                              setSubmitDocumentId(i.documentId);
                            }}
                            mr={3}
                          >
                            Submit
                          </Button>
                        </Center>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <NoData display="No Document found" />
                )}
              </div>
              <Drawer
                isOpen={isOpen}
                placement="right"
                size={"sm"}
                onClose={onClose}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Edit Document</DrawerHeader>

                  <DrawerBody>
                    <div className="flex flex-col gap-4">
                      <FormControl isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input
                          value={editTitle}
                          onChange={(e: any) => setEditTitle(e.target.value)}
                          placeholder="Title"
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                          value={editDescription}
                          onChange={(e: any) =>
                            setEditDescription(e.target.value)
                          }
                        />
                      </FormControl>
                    </div>
                  </DrawerBody>

                  <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button onClick={handleEdit} colorScheme="blue">
                      Edit Document
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef}
                motionPreset="slideInBottom"
                onClose={alertClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Submit for Review
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure? You want to submit this document for review.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={alertClose}>
                        Cancel
                      </Button>
                      <Button colorScheme="green" onClick={handleSubmit} ml={3}>
                        Submit
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col items-center justify-center   w-full ">
              <div className="w-full flex flex-wrap gap-4 pl-16 ">
                {data && data.pendingDocs.length > 0 ? (
                  data.pendingDocs.map((i: any) => (
                    <Card key={i._id} w={"80"}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Heading size="sm">{i.title}</Heading>
                          {i.cloneBy && (
                            <Highlight
                              query="Clone"
                              styles={{
                                px: "2",
                                py: "1",
                                rounded: "full",
                                bg: "red.100",
                              }}
                            >
                              Clone
                            </Highlight>
                          )}
                        </div>
                      </CardHeader>
                      <CardBody>
                        <Text>{i.description}</Text>
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        <Center width="full" justifyContent={"space-between"}>
                          <Text>{i.stage}</Text>
                          <Text>Version {i.version}</Text>
                        </Center>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <NoData display="No Pending Doc Found" />
                )}
              </div>
              <Drawer
                isOpen={isDrawerOpen}
                placement="right"
                size={"sm"}
                onClose={close}
                initialFocusRef={btnReff}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Create Document</DrawerHeader>

                  <DrawerBody>
                    <div className="flex flex-col gap-4">
                      <FormControl isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input
                          value={createTitle}
                          onChange={(e: any) => setCreateTitle(e.target.value)}
                          placeholder="Title"
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                          value={createDescription}
                          onChange={(e: any) =>
                            setCreateDescription(e.target.value)
                          }
                        />
                      </FormControl>
                    </div>
                  </DrawerBody>

                  <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={close}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreate} colorScheme="blue">
                      Create Document
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col items-center justify-center   w-full ">
              <div className="w-full flex flex-wrap gap-4 pl-16 ">
                {editCloneList && editCloneList.cloneDocList.length > 0 ? (
                  editCloneList.cloneDocList.map((i: any) => (
                    <Card key={i._id} w={"80"}>
                      <CardHeader>
                        <Heading size="sm">{i.title}</Heading>
                      </CardHeader>
                      <CardBody>
                        <Text>{i.description}</Text>
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        <Center width="full" justifyContent={"space-between"}>
                          <Button
                            ref={cloneRef}
                            colorScheme="teal"
                            onClick={() => {
                              setEditCloneDocumentId(i.cloneDocumentId);
                              openClone();
                              setEditCloneTitle(i.title);
                              setEditCloneDescription(i.description);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            colorScheme="blue"
                            onClick={() => {
                              submitCloneMutate({
                                cloneDocumentId: i.cloneDocumentId,
                              });
                            }}
                            mr={3}
                          >
                            Submit
                          </Button>
                        </Center>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <NoData display="No Cloned Document Found" />
                )}
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Drawer
        isOpen={isCloneOpen}
        placement="right"
        size={"sm"}
        onClose={closeClone}
        finalFocusRef={cloneRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit Document</DrawerHeader>

          <DrawerBody>
            <div className="flex flex-col gap-4">
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  value={editCloneTitle}
                  onChange={(e: any) => setEditCloneTitle(e.target.value)}
                  placeholder="Title"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={editCloneDescription}
                  onChange={(e: any) => setEditCloneDescription(e.target.value)}
                />
              </FormControl>
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={closeClone}>
              Cancel
            </Button>
            <Button onClick={handleCloneEdit} colorScheme="blue">
              Edit Clone Document
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Profile;
