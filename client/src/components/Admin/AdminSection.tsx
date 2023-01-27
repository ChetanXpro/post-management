import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Heading,
  Highlight,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import usePrivateApis from "../../hook/usePrivateApis";
import Loader from "../Loader/Loader";
import NoData from "../NoData/NoData";

const AdminSection = () => {
  const { getPendingDocs, approveClone, rejectClone, rejectDocs, approveDocs } =
    usePrivateApis();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [parentTitle, setParentTitle] = useState("");
  const [cloneDocId, setCloneDocId] = useState("");
  const [parentDescription, setParentDescription] = useState("");
  const queryClient = useQueryClient();
  const { isLoading, data, refetch } = useQuery("pending", getPendingDocs);

  const { mutate: approveCloneMutate } = useMutation(approveClone, {
    onSuccess: () => {
      queryClient.invalidateQueries("pending");
      refetch();
      onClose();
    },
  });
  const { mutate: rejectCloneMutate } = useMutation(rejectClone, {
    onSuccess: () => {
      queryClient.invalidateQueries("pending");
      refetch();
      onClose();
    },
  });
  const { mutate: approveDoc } = useMutation(approveDocs, {
    onSuccess: () => {
      queryClient.invalidateQueries("pending");
      refetch();
    },
  });
  const { mutate: rejectDoc } = useMutation(rejectDocs, {
    onSuccess: () => {
      queryClient.invalidateQueries("pending");
      refetch();
    },
  });
  const btnRef = useRef() as any;

  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col relative  items-center">
      <Tabs variant="soft-rounded" h={"full"} w="full" colorScheme="green">
        <TabList m={'3'}>
          <Tab>New Document</Tab>
          <Tab>New Version</Tab>
        </TabList>
        <TabPanels px={'6'}>
          <TabPanel>
            <div className="flex flex-col items-center justify-center   w-full ">
              <div className="w-full flex flex-wrap gap-4  justify-center  ">
                {data && data.pendingDocs.length > 0 ? (
                  data.pendingDocs.map(
                    (i: any) =>
                      i?.documentId && (
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
                            <Center
                              width="full"
                              justifyContent={"space-between"}
                            >
                              <Button
                                onClick={() =>
                                  approveDoc({ documentId: i.documentId })
                                }
                              >
                                Approve
                              </Button>
                              <Button
                                onClick={() =>
                                  rejectDoc({ documentId: i.documentId })
                                }
                              >
                                Reject
                              </Button>
                            </Center>
                          </CardFooter>
                        </Card>
                      )
                  )
                ) : (
                  <NoData display="No Request found" />
                )}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col items-center justify-center   w-full ">
              <div className="w-full flex flex-wrap  gap-4  justify-center  ">
                {data && data.pendingDocs.length > 0 ? (
                  data.pendingDocs.map(
                    (i: any) =>
                      i.cloneBy && (
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
                            <Center
                              width="full"
                              justifyContent={"space-between"}
                            >
                              <Button
                                onClick={() => {
                                  setTitle(i.title);
                                  setDescription(i.description);
                                  setParentTitle(i.parentTitle);
                                  setParentDescription(i.parentDescription);
                                  setCloneDocId(i.cloneDocumentId);
                                  onOpen();
                                }}
                              >
                                Review
                              </Button>
                            </Center>
                          </CardFooter>
                        </Card>
                      )
                  )
                ) : (
                  <NoData display="No Request found" />
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
                  <DrawerHeader>Review Document</DrawerHeader>

                  <DrawerBody>
                    <div className="flex font-sans flex-col gap-4">
                      <Text className="underline" fontSize={"2xl"}>
                        Orignal document
                      </Text>
                      <div>
                        <Text fontSize={"xl"}>Title</Text>
                        <Text>{parentTitle}</Text>
                      </div>
                      <div>
                        <Text fontSize={"xl"}> Description</Text>
                        <Text>{parentDescription}</Text>
                      </div>
                      <Text className="underline" fontSize={"2xl"}>
                        Change Requested
                      </Text>
                      <div>
                        <Text fontSize={"xl"}>Title</Text>
                        <Text>{title}</Text>
                      </div>
                      <div>
                        <Text fontSize={"xl"}> Description</Text>
                        <Text>{description}</Text>
                      </div>
                    </div>
                  </DrawerBody>

                  <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        rejectCloneMutate({ cloneDocumentId: cloneDocId });
                      }}
                      colorScheme="red"
                      mr={"2"}
                    >
                      Reject
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        approveCloneMutate({ cloneDocumentId: cloneDocId });
                      }}
                    >
                      Approve
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default AdminSection;
