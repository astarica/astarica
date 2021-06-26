import { Box, Heading, VStack } from "@chakra-ui/layout"

import { Button } from "@chakra-ui/button"
import { MeCtx } from "./MeCtx"
import { useContext } from "react"

export const Template = () => {
  const { me } = useContext(MeCtx)

  return (
    <VStack p={4} alignItems="flex-start" w="full">
      <Heading w="full" size="sm">
        Setting Template Undangan
      </Heading>
      <Box borderLeftWidth={6} borderColor="teal" p={4} bgColor="white">
        <Box mb={3}>{me.template || ""}</Box>
        <Button size="xs" px={4} colorScheme="teal">
          Edit
        </Button>
      </Box>
    </VStack>
  )
}
