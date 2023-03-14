import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToChart } from "../redux/productSlice";

function Product({ item }) {
  const budget = useSelector((state) => state.products.budget);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  useEffect(() => {
    dispatch(addToChart({ id: item.id, count: count }));
  }, [dispatch, count, item.id]);
  const handelBuy = () => {
    setCount((p) => p + 1);
  };
  const handelSell = () => {
    setCount((p) => p - 1);
  };
  const handleChange = (value) => {
    const maxCount = Math.floor(budget / item.productPrice) + count; // + count dememizin nedeni başta girdiğimiz input(count) değerinin budget'i düşürmesi dolayısıyla Math.floor'un kalan budget değerine göre max değeri bulması.

    if (value && value > 0) {
      if (value > maxCount && budget >= 0) {
        setCount(maxCount);
      } else {
        setCount(value);
      }
    } else {
      setCount(0);
    }
  };
  return (
    <div>
      <Card maxW="sm">
        <CardBody>
          <Image
            src={item.image}
            alt={item.productName}
            borderRadius="lg"
            height="157px"
            objectFit="contain"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" noOfLines={1}>
              {item.productName}
            </Heading>

            <Text color="blue.600" fontSize="2xl" noOfLines={1}>
              <strong> {item.productPrice} $</strong>
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button
              colorScheme="red"
              onClick={handelSell}
              isDisabled={count === 0 ? true : false}
            >
              Sell
            </Button>
            <Input
              fontSize={16}
              textAlign="center"
              htmlSize={4}
              width="auto"
              type="number"
              size="sm"
              maxW={14}
              height={10}
              disabled
              value={count}
              onChange={(e) => handleChange(e.target.value)}
            />

            <Button
              colorScheme="blue"
              fontSize={14}
              onClick={handelBuy}
              isDisabled={item.productPrice > budget ? true : false}
            >
              Buy
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Product;
