import { AddIcon, CopyIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons"
import { Box, Flex, HStack, Heading, VStack } from "@chakra-ui/layout"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input"

import { Button } from "@chakra-ui/button"
import { Invitation as IInvitation } from "@prisma/client"
import { MeCtx } from "./MeCtx"
import { Select } from "@chakra-ui/select"
import { useContext } from "react"

export const Invitation = () => {
  const { me } = useContext(MeCtx)
  return (
    <VStack w="full" p={4}>
      <Flex justifyContent="space-between" w="full">
        <Heading w="full" size="sm">
          Data Undangan
        </Heading>
        <Button size="xs" px={4} colorScheme="blue" rightIcon={<AddIcon />}>
          Add
        </Button>
      </Flex>
      <Flex
        w="full"
        py={2}
        px={4}
        borderRadius="sm"
        bgColor="white"
        justify="space-between"
      >
        <Box>
          <Select size="xs" variant="flushed">
            <option>Semua</option>
          </Select>
        </Box>
        <Box>
          <InputGroup size="xs">
            <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
            <Input variant="filled" placeholder="Ketik nama..." />
          </InputGroup>
        </Box>
      </Flex>
      <VStack w="full">
        {me.invitations.map((invitation) => (
          <InvitationItem
            key={invitation.id.toString() + invitation.lastUpdate}
            data={invitation}
          />
        ))}
      </VStack>
    </VStack>
  )
}

const InvitationItem = ({ key, data }: { key?: string; data: IInvitation }) => (
  <HStack
    key={key}
    w="full"
    p={2}
    bgColor="white"
    borderRadius="sm"
    borderLeftWidth={5}
    borderColor="teal"
    justify="space-between"
  >
    <VStack alignItems="flex-start" spacing={1}>
      <Heading size="sm" color="teal">
        {data.name}
      </Heading>
      <Box fontSize="sm">{data.address}</Box>
    </VStack>
    <VStack>
      <Box
        textTransform="uppercase"
        color="red.500"
        fontSize="sm"
        fontWeight="bold"
      >
        {data.status}
      </Box>
      <HStack color="blackAlpha.700">
        <CopyIcon />
        <DeleteIcon />
      </HStack>
    </VStack>
  </HStack>
)
