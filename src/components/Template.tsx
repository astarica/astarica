import { Box, Heading, VStack } from "@chakra-ui/layout"

import { Button } from "@chakra-ui/button"

export const Template = () => (
  <VStack p={4} alignItems="flex-start" w="full">
    <Heading w="full" size="sm">
      Setting Template Undangan
    </Heading>
    <Box borderLeftWidth={6} borderColor="teal" p={4} bgColor="white">
      <Box mb={3}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab totam
        dolores deserunt fugit illum debitis, ad ducimus tempore illo? Quas
        dolorem, quisquam quis repellendus blanditiis tempore voluptatem eveniet
        earum error porro possimus sequi quasi saepe delectus optio facere a?
      </Box>
      <Button size="xs" px={4} colorScheme="teal">
        Edit
      </Button>
    </Box>
  </VStack>
)
