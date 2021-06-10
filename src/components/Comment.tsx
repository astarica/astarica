import { Box, Flex, HStack, Heading, VStack } from "@chakra-ui/layout"

const Item = () => (
  <HStack p={4} bgColor="white" w="full" alignItems="flex-start">
    <Box>
      <Flex
        alignItems="center"
        justify="center"
        borderRadius="full"
        bgColor="teal"
        color="white"
        fontSize={["md", "xl"]}
        fontFamily="sans-serif"
        w={["30px", "50px"]}
        h={["30px", "50px"]}
      >
        M
      </Flex>
    </Box>
    <Box w="full">
      <Flex justifyContent="space-between" wrap="wrap" mb={2}>
        <Heading size="sm" color="teal">
          Muhammad Wafa
        </Heading>
        <Box fontSize="xs" color="blackAlpha.700">
          2 menit yang lalu
        </Box>
      </Flex>
      <Box fontSize="sm" lineHeight="1.2em">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem assumenda
        suscipit asperiores ducimus consectetur! Ipsum doloremque enim rem
      </Box>
    </Box>
  </HStack>
)

export const Comment = () => (
  <VStack p={4} w="full" alignItems="flex-start">
    <Heading w="full" size="small" textAlign="left">
      Ucapan Terbaru
    </Heading>
    <VStack w="full" alignItems="stretch" justifyContent="stretch">
      <Item />
      <Item />
      <Item />
      <Item />
    </VStack>
  </VStack>
)
