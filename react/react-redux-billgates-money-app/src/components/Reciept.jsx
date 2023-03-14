import {
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

function Reciept() {
  const items = useSelector((state) => state.products.items);
  const initialMoney = useSelector((state) => state.products.initialMoney);
  const budget = useSelector((state) => state.products.budget);
  const filtered = items.filter((item) => item.count > 0);
  if (filtered.length === 0) {
    return null;
  }
  const editBudget = Number(initialMoney - budget).toLocaleString();
  return (
    <div>
      <TableContainer p={10}>
        <Heading>Your Reciept</Heading>
        <Table variant="striped" colorScheme="teal" marginTop={3}>
          <TableCaption>
            You have <strong>{filtered.length}</strong> different products in
            your chart
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th isNumeric>Number</Th>
              <Th isNumeric>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filtered.map((product) => (
              <Tr>
                <Td>{product.productName}</Td>
                <Td isNumeric>X {product.count}</Td>
                <Td isNumeric>$ {product.count * product.productPrice}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th fontSize="xl" isNumeric></Th>
              <Th fontSize="xl" isNumeric>
                TOTAL
              </Th>
              <Th fontSize="xl" isNumeric>
                $ {editBudget}
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Reciept;
