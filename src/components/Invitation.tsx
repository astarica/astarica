import { AddIcon, CopyIcon, SearchIcon } from "@chakra-ui/icons"
import { Box, Flex, HStack, Heading, VStack } from "@chakra-ui/layout"
import { Invitation as IInvitation, Status } from "@prisma/client"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input"
import { StackProps, useToast } from "@chakra-ui/react"
import { useContext, useState } from "react"

import { Button } from "@chakra-ui/button"
import Fuse from "fuse.js"
import { MeCtx } from "./MeCtx"
import { Select } from "@chakra-ui/select"
import { UploadModal } from "./UploadModal"
import { statusMapping } from "../services/status"

export const Invitation = () => {
  const { me } = useContext(MeCtx)
  const [q, setQ] = useState("")
  const [showStat, setShowStat] = useState("")

  const fuse = new Fuse(me.invitations, { keys: ["name", "address"] })

  const grep = fuse.search(q).map((t) => t.item as IInvitation)
  const items = grep.length
    ? grep.filter((i) => (showStat ? i.status === showStat : true))
    : me.invitations.filter((i) => (showStat ? i.status === showStat : true))

  return (
    <VStack w="full" p={4}>
      <Flex justifyContent="space-between" w="full">
        <Heading w="full" size="sm">
          Data Undangan
        </Heading>
        <UploadModal
          size="xs"
          px={4}
          colorScheme="blue"
          rightIcon={<AddIcon />}
        >
          Add
        </UploadModal>
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
          <Select
            size="xs"
            variant="flushed"
            textTransform="uppercase"
            onChange={({ target }) => setShowStat(target.value)}
          >
            <option key="all" value="">
              semua
            </option>
            {Object.keys(Status).map((s) => {
              const value = s as Status
              return (
                <option key={s} value={value}>
                  {statusMapping(value).name}
                </option>
              )
            })}
          </Select>
        </Box>
        <Box>
          <InputGroup size="xs">
            <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
            <Input
              variant="filled"
              placeholder="Ketik nama..."
              value={q}
              onChange={({ target }) => setQ(target.value)}
            />
          </InputGroup>
        </Box>
      </Flex>
      <VStack w="full">
        {items.map((invitation) => (
          <InvitationItem
            key={invitation.id.toString() + invitation.lastUpdate}
            data={invitation}
          />
        ))}
      </VStack>
    </VStack>
  )
}

const InvitationItem = ({
  data,
  ...props
}: StackProps & { data: IInvitation }) => {
  const toast = useToast()
  const { name, color } = statusMapping(data.status)
  const { me } = useContext(MeCtx)
  const copy = () => {
    const fullText = me.template
      .replace(/\[\s*name\s*\]/g, data.name)
      .replace(/\[\s*address\s*\]/g, data.address)
      .replace(/\[\s*link\s*\]/g, me.link + "?inv=" + data.id)
    const isCopy = copyToClipboard(fullText)
    if (isCopy) toast({ title: "Undangan telah disalin", status: "success" })
  }
  function copyToClipboard(text: string) {
    if (!document) return false
    var dummy = document.createElement("textarea")
    document.body.appendChild(dummy)
    dummy.value = text
    dummy.select()
    document.execCommand("copy")
    document.body.removeChild(dummy)
    return true
  }
  return (
    <HStack
      w="full"
      p={2}
      bgColor="white"
      borderRadius="sm"
      borderLeftWidth={5}
      borderColor="teal"
      justify="space-between"
      {...props}
    >
      <VStack alignItems="flex-start" spacing={1}>
        <Heading size="sm" color="teal">
          {data.name}
        </Heading>
        <Box fontSize="sm">{data.address}</Box>
      </VStack>
      <VStack align="flex-end">
        <Box
          textTransform="uppercase"
          color={color}
          fontSize="sm"
          fontWeight="bold"
        >
          {name}
        </Box>
        <Button
          size="sm"
          aria-label="copy-invitation"
          rightIcon={<CopyIcon />}
          onClick={copy}
        >
          Copy
        </Button>
      </VStack>
    </HStack>
  )
}
