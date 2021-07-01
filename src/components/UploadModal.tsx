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
import { useContext, useState } from "react"

import { AddIcon } from "@chakra-ui/icons"
import { MeCtx } from "./MeCtx"
import { fetcher } from "../services/fetcher"

export const UploadModal = (props: ButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [inv, setInv] = useState({ name: "", address: "" })
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
        update()
      })
  }

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
                  type="file"
                  variant="flushed"
                  placeholder="alamat"
                  accept=".xlsx"
                ></Input>
                <Button size="sm" leftIcon={<AddIcon />} colorScheme="teal">
                  Tambah Penerima (0)
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
