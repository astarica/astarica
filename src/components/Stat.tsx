import { Box, HStack, Heading, VStack } from "@chakra-ui/layout"

import { Container } from "./Container"

export const Stat = () => (
  <Container w="full" px={4}>
    <HStack spacing={4} overflowX="auto" w="full" alignItems="stretch" pb={4}>
      <StatBox amount={512} label="Jumlah undangan" />
      <StatBox amount={502} label="Konfirmasi hadir" />
      <StatBox amount={10} label="konfirmasi tidak hadir" />
      <StatBox amount={10} label="belum konfirmasi" />
    </HStack>
  </Container>
)

const StatBox = ({ amount, label }: { amount?: number; label?: string }) => (
  <VStack bgColor="teal" p={3} color="white" borderRadius="sm" h="auto">
    <Heading>{amount}</Heading>
    <Box textTransform="uppercase" textAlign="center" fontSize={["xs", "md"]}>
      {label}
    </Box>
  </VStack>
)
