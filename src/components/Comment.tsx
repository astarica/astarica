import { Box, Flex, HStack, Heading, VStack } from "@chakra-ui/layout"

import { Comment as IComment } from "@prisma/client"
import { MeCtx } from "./MeCtx"
import moment from "moment"
import { useContext } from "react"

const Item = ({ data }: { data: IComment }) => (
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
        {data.name.slice(0, 1)}
      </Flex>
    </Box>
    <Box w="full">
      <Flex justifyContent="space-between" wrap="wrap" mb={2}>
        <Heading size="sm" color="teal">
          {data.name}
        </Heading>
        <Box fontSize="xs" color="blackAlpha.700">
          {moment(data.createdAt).fromNow()}
        </Box>
      </Flex>
      <Box fontSize="sm" lineHeight="1.2em">
        {data.text}
      </Box>
    </Box>
  </HStack>
)

export const Comment = () => {
  const { me } = useContext(MeCtx)
  return (
    <VStack p={4} w="full" alignItems="flex-start">
      <Heading w="full" size="small" textAlign="left">
        Ucapan Terbaru
      </Heading>
      <VStack w="full" alignItems="stretch" justifyContent="stretch">
        {me.comments.map((c) => (
          <Item data={c} />
        ))}
      </VStack>
    </VStack>
  )
}
