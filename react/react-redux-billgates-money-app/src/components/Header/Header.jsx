import { Avatar, Container, WrapItem } from "@chakra-ui/react";
import React from "react";
function Header() {
  return (
    <>
      <Container
        maxW="container.xl"
        bg="green.400"
        color="#262626"
        padding={7}
        borderRadius="15"
      >
        <WrapItem
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Avatar
            size="2xl"
            name="Bill Gates"
            src="https://neal.fun/spend/billgates.jpg"
          />
        </WrapItem>
        <h1 style={{ fontSize: 25 }}>
          <strong>Spend Bill Gate' Money</strong>
        </h1>
      </Container>
    </>
  );
}

export default Header;
