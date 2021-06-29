import { Box, Heading, VStack } from "@chakra-ui/layout"
import { Textarea, useToast } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"

import { Button } from "@chakra-ui/button"
import { MeCtx } from "./MeCtx"
import { fetcher } from "../services/fetcher"

export const Template = () => {
  const { me, update } = useContext(MeCtx)
  const [isEdit, setIsEdit] = useState(false)

  const [template, setTemplate] = useState(me.template)
  const toast = useToast()

  useEffect(() => {
    setTemplate(me.template)
  }, [me])

  const templateFormatter = (t: string) => {
    return t
      .replace(/\n/g, "<br/>")
      .replace(/(\*)([^\*]*)(\*)/g, "<strong>$2</strong>")
      .replace(/(\_)([^\_]*)(\_)/g, "<i>$2</i>")
      .replace(/(\~)([^\~]*)(\~)/g, "<s>$2</s>")
  }

  const updateTemplate = () => {
    fetcher<{ error: boolean }>("/api/template", {
      method: "POST",
      body: JSON.stringify({ template }),
    })
      .then((d) => {
        if (!d.error)
          toast({ title: "Template telah di update.", status: "success" })
      })
      .catch(console.log)
      .finally(() => update())
  }

  return (
    <VStack p={4} alignItems="flex-start" w="full">
      <Heading w="full" size="sm">
        Setting Template Undangan
      </Heading>
      <Box
        borderLeftWidth={6}
        borderColor="teal"
        w="full"
        p={4}
        bgColor="white"
      >
        {isEdit ? (
          <Textarea
            value={template}
            onChange={({ target }) => setTemplate(target.value)}
            rows={template.split("\n").length}
          />
        ) : (
          <Box
            w="full"
            mb={3}
            dangerouslySetInnerHTML={{
              __html: templateFormatter(me.template) || "",
            }}
          ></Box>
        )}
        <Button
          size="xs"
          px={4}
          colorScheme="teal"
          onClick={() => {
            if (isEdit) updateTemplate()
            setIsEdit((v) => !v)
          }}
        >
          {isEdit ? "Submit" : "Edit"}
        </Button>
      </Box>
    </VStack>
  )
}
