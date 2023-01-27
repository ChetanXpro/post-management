import { Spinner } from "@chakra-ui/react";



const Loader = () => {
  return (
    <div className="fixed top-[50%] left-[50%] bottom-0 right-0 z-50 ">
      <Spinner size={"lg"} />
    </div>
  );
};

export default Loader;
