import { Box, Divider, Heading, VStack } from "@chakra-ui/layout"

import { Button } from "@chakra-ui/button"
import { Container } from "../components/Container"
import { Input } from "@chakra-ui/input"

const Index = () => (
  <Container justifyContent="center" height="100vh">
    <Heading>Astarica</Heading>
    <Box>Dashboard</Box>
    <VStack my={6} as="form" w="full" maxW="xs" spacing={3}>
      <Input variant="flushed" placeholder="username" type="text" />
      <Input variant="flushed" placeholder="password" type="password" />
      <Button colorScheme="teal" w="full">
        Login
      </Button>
      <Divider />
      <Box fontSize="small">Copyright &copy; {new Date().getFullYear()}</Box>
    </VStack>
  </Container>
)

export default Index
