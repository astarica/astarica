import { Box, Heading, VStack } from "@chakra-ui/layout"

import { Button } from "@chakra-ui/button"
import { MeCtx } from "./MeCtx"
import { useContext } from "react"

export const Template = () => {
  const { me } = useContext(MeCtx)

  const templateFormatter = (t: string) => {
    console.log(t)
    return t
      .replace(/\n/g, "<br/>")
      .replace(/(\*)([^\*]*)(\*)/g, "<strong>$2</strong>")
      .replace(/(\_)([^\_]*)(\_)/g, "<i>$2</i>")
      .replace(/(\~)([^\~]*)(\~)/g, "<s>$2</s>")
  }

  return (
    <VStack p={4} alignItems="flex-start" w="full">
      <Heading w="full" size="sm">
        Setting Template Undangan
      </Heading>
      <Box borderLeftWidth={6} borderColor="teal" p={4} bgColor="white">
        <Box
          mb={3}
          dangerouslySetInnerHTML={{
            __html: templateFormatter(me.template) || "",
          }}
        ></Box>
        <Button size="xs" px={4} colorScheme="teal">
          Edit
        </Button>
      </Box>
    </VStack>
  )
}
