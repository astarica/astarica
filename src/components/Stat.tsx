import { Box, HStack, Heading, VStack } from "@chakra-ui/layout"

import { Container } from "./Container"
import { MeCtx } from "./MeCtx"
import { Status } from "@prisma/client"
import { useContext } from "react"

export const Stat = () => {
  const { me } = useContext(MeCtx)

  const total = me.invitations.length
  const confirmed = me.invitations.filter(
    (x) => x.status === Status.CONFIRMED
  ).length
  const absent = me.invitations.filter((x) => x.status === Status.ABSENT).length
  const confused = me.invitations.filter(
    (x) => x.status === Status.CONFUSED
  ).length
  const noConfirmation = me.invitations.filter(
    (x) => x.status === Status.NO_CONFIRMATION
  ).length
  return (
    <Container w="full" px={4}>
      <HStack spacing={4} overflowX="auto" w="full" alignItems="stretch" pb={4}>
        <StatBox amount={total} label="Jumlah undangan" />
        <StatBox amount={confirmed} label="Konfirmasi hadir" />
        <StatBox amount={absent} label="konfirmasi tidak hadir" />
        <StatBox amount={confused} label="konfirmasi bingung" />
        <StatBox amount={noConfirmation} label="belum konfirmasi" />
      </HStack>
    </Container>
  )
}

const StatBox = ({ amount, label }: { amount?: number; label?: string }) => (
  <VStack bgColor="teal" p={3} color="white" borderRadius="sm" h="auto">
    <Heading>{amount}</Heading>
    <Box textTransform="uppercase" textAlign="center" fontSize={["xs", "md"]}>
      {label}
    </Box>
  </VStack>
)
