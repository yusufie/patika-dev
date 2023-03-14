import { Container, Divider, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import Product from "./Product";
import Reciept from "./Reciept";

function Table() {
  const items = useSelector((state) => state.products.items);
  const budget = useSelector((state) => state.products.budget);
  const basket = useSelector((state) => state.products.basket);
  const editBudget = Number(budget).toLocaleString(); // Burda bütçe değerinin aralarına virgül koyulmasını sağladık.

  console.log({ basket });
  return (
    <div style={{ margin: 5 }}>
      <Container
        maxW="container.xl"
        bg="green.400"
        color="#262626"
        borderRadius={10}
        position="-webkit-sticky"
        pos="sticky"
        top="0"
        zIndex={1}
      >
        <Divider />
        <h1 style={{ fontSize: 45 }}>
          <strong>
            {editBudget === "0"
              ? "Congrats!!! You Spent All Bill Gates' Money"
              : `$ ${editBudget}`}
          </strong>
        </h1>
      </Container>

      <Container maxW="container.xl" marginTop={4}>
        <SimpleGrid
          spacing={10}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        >
          {items.map((item) => (
            <Product item={item} key={item.id} />
          ))}
        </SimpleGrid>
        <Reciept />
      </Container>
    </div>
  );
}

export default Table;
