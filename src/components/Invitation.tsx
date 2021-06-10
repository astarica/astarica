import { AddIcon, CopyIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons"
import { Box, Flex, HStack, Heading, VStack } from "@chakra-ui/layout"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input"

import { Button } from "@chakra-ui/button"
import { Select } from "@chakra-ui/select"

export const Invitation = () => (
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
      <InvitationItem />
      <InvitationItem />
      <InvitationItem />
    </VStack>
  </VStack>
)

const InvitationItem = () => (
  <HStack
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
        Ignatius Sandra
      </Heading>
      <Box fontSize="sm">Way Arong, Kalianda</Box>
    </VStack>
    <VStack>
      <Box
        textTransform="uppercase"
        color="red.500"
        fontSize="sm"
        fontWeight="bold"
      >
        Hadir
      </Box>
      <HStack color="blackAlpha.700">
        <CopyIcon />
        <DeleteIcon />
      </HStack>
    </VStack>
  </HStack>
)
