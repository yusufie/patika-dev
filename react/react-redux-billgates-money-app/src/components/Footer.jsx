import {
  ButtonGroup,
  IconButton,
  Stack,
  Text,
  Container,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import React from "react";

function Footer() {
  return (
    <Container
      maxW="container.xl"
      bg="green.400"
      color="#262626"
      borderRadius="10"
      padding={8}
      marginTop={5}
    >
      <Stack justify="center" direction="row" display="flex" marginBottom={5}>
        <ButtonGroup variant="ghost">
          <IconButton
            target="_blank"
            as="a"
            href="https://www.linkedin.com/in/yusufaknar/"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton
            target="_blank"
            as="a"
            href="https://github.com/yusufie"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
          />
          <IconButton
            target="_blank"
            as="a"
            href="https://twitter.com"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          />
        </ButtonGroup>
      </Stack>
      <Text fontSize={10} color="subtle">
        &copy; {new Date().getFullYear()} Created By yusufie
      </Text>
    </Container>
  );
}

export default Footer;
