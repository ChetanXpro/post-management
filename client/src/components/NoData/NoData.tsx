import { Text } from "@chakra-ui/react";

const NoData = ({ display }: { display: string }) => {
  return (
    <div className=" flex h-[100%] w-[100%] items-center mt-20  justify-center">
      <Text fontFamily={"fantasy"} fontSize="2xl">
        {display}
      </Text>
    </div>
  );
};

export default NoData;
