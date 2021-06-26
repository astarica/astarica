import { Box, Divider, Flex, HStack } from "@chakra-ui/layout"

import { Button } from "@chakra-ui/button"
import { MeCtx } from "./MeCtx"
import { useContext } from "react"
import { useRouter } from "next/dist/client/router"

export const Navbar = () => {
  const router = useRouter()
  const { me } = useContext(MeCtx)
  return (
    <Flex
      justifyContent="flex-end"
      bgColor="teal"
      color="white"
      p={4}
      w="full"
      mb={4}
    >
      <HStack>
        <Box fontWeight="bold">{me.name}</Box>
        <Divider variant="solid" orientation="vertical" />
        <Button
          size="sm"
          colorScheme="whiteAlpha"
          onClick={() => router.push("/")}
        >
          Logout
        </Button>
      </HStack>
    </Flex>
  )
}
