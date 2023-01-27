import { Text } from "@chakra-ui/react";

const NoData = ({ display }: { display: string }) => {
  return (
    <div className=" flex h-[100%] font-sans w-[100%] items-center mt-20  justify-center">
      <Text fontSize="2xl">
        {display}
      </Text>
    </div>
  );
};

export default NoData;
