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
  Heading,
  Input,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import useAuthentication from "../../hook/useAuthentication";
import usePrivateApis from "../../hook/usePrivateApis";

const Home = () => {
  const { getDocs } = usePrivateApis();
  const { data, isLoading } = useQuery("docs", getDocs);
  const { role } = useAuthentication();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="m-6">
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {data &&
          data.allApprovedDoc.map((i: any) => (
            <Card key={i._id}>
              <CardHeader>
                <Heading size="md">{i.title}</Heading>
              </CardHeader>
              <CardBody>
                <Text>{i.description}</Text>
              </CardBody>
              <CardFooter>
                {role === "Admin" ? (
                  <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
                    Edit
                  </Button>
                ) : (
                  ""
                )}
                <Center  width='full' justifyContent={'end'}>
                  <Text>Version {i.version}</Text>
                </Center>
              </CardFooter>
            </Card>
          ))}
      </SimpleGrid>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Home;
