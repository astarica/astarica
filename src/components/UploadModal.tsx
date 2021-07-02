import {
  Box,
  Button,
  ButtonProps,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useContext, useRef, useState } from "react"

import { AddIcon } from "@chakra-ui/icons"
import { MeCtx } from "./MeCtx"
import XLSX from "xlsx"
import { fetcher } from "../services/fetcher"

export const UploadModal = (props: ButtonProps) => {
  const fileInput = useRef<HTMLInputElement>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [inv, setInv] = useState({ name: "", address: "" })
  const [invs, setInvs] = useState<{ name: string; address: string }[]>([])
  const { update } = useContext(MeCtx)
  const toast = useToast()

  const upload = (data: { name: string; address: string }[]) => {
    fetcher<{ error: boolean }>("/api/invitation", {
      method: "POST",
      body: JSON.stringify({ data }),
    })
      .then((e) => {
        if (!e.error)
          toast({
            title: "Penerima undangan telah ditambahkan",
            status: "success",
          })
      })
      .catch(console.log)
      .finally(() => {
        setInv({ name: "", address: "" })
        setInvs([])
        if (fileInput.current) fileInput.current.value = ""
        update()
        onClose()
      })
  }

  const fileHandle = (f: File) =>
    new Promise<{ name: string; address: string }[]>((res, rej) => {
      var reader = new FileReader()
      reader.onload = function (e) {
        if (!e.target) return rej("no file")
        const data = e.target.result
        const workbook = XLSX.read(data, { type: "binary" })
        const invitations = XLSX.utils.sheet_to_json<object>(
          workbook.Sheets[workbook.SheetNames[0]]
        )
        const result = invitations
          .filter((x) => "name" in x && "address" in x)
          .map((x) => x as { name: string; address: string })
        res(result)
      }
      reader.readAsBinaryString(f)
    })

  return (
    <>
      <Button onClick={onOpen} {...props} />

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderTopRadius="md" bgColor="teal" color="white">
            Tambah Undangan
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={4}>
            <Stack
              spacing={6}
              alignItems="center"
              direction={["column", "row"]}
            >
              <VStack w="full" alignItems="flex-start" spacing={4}>
                <Box fontWeight="bold">Masukkan data per orang</Box>
                <Input
                  variant="flushed"
                  size="sm"
                  placeholder="Nama"
                  value={inv.name}
                  onChange={({ target }) =>
                    setInv((e) => {
                      return { ...e, name: target.value }
                    })
                  }
                ></Input>
                <Input
                  variant="flushed"
                  size="sm"
                  placeholder="Alamat"
                  value={inv.address}
                  onChange={({ target }) =>
                    setInv((e) => {
                      return { ...e, address: target.value }
                    })
                  }
                ></Input>
                <Button
                  size="sm"
                  leftIcon={<AddIcon />}
                  colorScheme="teal"
                  isDisabled={!inv.name || !inv.address}
                  onClick={() => upload([inv])}
                >
                  Tambah Penerima
                </Button>
              </VStack>
              <Box>atau</Box>
              <VStack w="full">
                <Box fontWeight="bold">Masukkan lebih banyak data (*.xlsx)</Box>
                <Input
                  ref={fileInput}
                  type="file"
                  variant="flushed"
                  placeholder="alamat"
                  accept=".xlsx"
                  onChange={async ({ target }) => {
                    const f = target.files ? target.files[0] : null
                    if (!f) return null
                    const data = await fileHandle(f)
                    if (data.length) setInvs(data)
                  }}
                ></Input>
                <Button
                  size="sm"
                  disabled={!invs.length}
                  leftIcon={<AddIcon />}
                  colorScheme="teal"
                  onClick={() => upload(invs)}
                >
                  Tambah Penerima ({invs.length})
                </Button>
              </VStack>
            </Stack>
          </ModalBody>
        </ModalContent>
        <ModalFooter />
      </Modal>
    </>
  )
}
