import { Box, Heading } from "@chakra-ui/layout"

import { Container } from "./Container"

export const Hero = () => (
  <Container alignItems="flex-start" p={4} w="full">
    <Heading>Hallo Wafa,</Heading>
    <Box>Selamat datang di dashboard undanganmu</Box>
  </Container>
)
