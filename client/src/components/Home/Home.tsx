import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
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
  Input,
  SimpleGrid,
  TagLabel,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import useAuthentication from "../../hook/useAuthentication";
import usePrivateApis from "../../hook/usePrivateApis";

const Home = () => {
  const { getDocs, cloneDocs } = usePrivateApis();

  const [documentId, setDocumentId] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const { data, isLoading } = useQuery("docs", getDocs);
  const { role } = useAuthentication();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast({ position: "top" });

  const btnRef = React.useRef() as any;

  const { mutate } = useMutation(cloneDocs);

  // const cloneDoc = () => {
  //   mutate({ documentId });
  // };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="m-6">
      <div className="w-full flex flex-wrap gap-4  ">
        {data &&
          data.allApprovedDoc.map((i: any) => (
            <Card key={i._id} w="80">
              <CardHeader>
                <Heading size="md">{i.title}</Heading>
              </CardHeader>
              <CardBody>
                <Text>{i.description}</Text>
              </CardBody>
              <CardFooter>
                {role === "Admin" || role === 'Creator' ? (
                  <Button
                    colorScheme="teal"
                    onClick={() => {
                      mutate({ documentId: i.documentId });
                    }}
                  >
                    Clone
                  </Button>
                ) : (
                  ""
                )}
                <Center width="full" justifyContent={"end"}>
                  <Text>Version {i.version}</Text>
                </Center>
              </CardFooter>
            </Card>
          ))}
      </div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="sm"
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit Document</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Submit Request</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Home;
