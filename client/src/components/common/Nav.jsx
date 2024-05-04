import React from "react";
import { Flex } from "@chakra-ui/react";

const Nav = () => {
  return (
    <Flex
      justifyContent="space-between"
      bg="red.900"
      p={{ base: 0, sm: 3, md: 8 }}
    >
      <div>Logo</div>
      <Flex>menu</Flex>
    </Flex>
  );
};

export default Nav;
