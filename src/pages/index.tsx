import { Box, Divider, Heading, VStack } from "@chakra-ui/layout"
import { FormEventHandler, useEffect, useState } from "react"

import { Button } from "@chakra-ui/button"
import { Container } from "../components/Container"
import { DefaultResponse } from "../types"
import Head from "next/head"
import { Input } from "@chakra-ui/input"
import { fetcher } from "../services/fetcher"
import { useRouter } from "next/dist/client/router"
import { useToast } from "@chakra-ui/react"

const Index = () => {
  const router = useRouter()
  const toast = useToast()
  const [load, setLoad] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  useEffect(() => {
    fetcher<DefaultResponse>("/api/auth")
      .then((r) => {
        if (!r.error) router.push("/dashboard")
      })
      .catch(console.log)
  }, [])

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    setLoad(true)
    fetcher<DefaultResponse>("/api/auth", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((r) => {
        if (r.error) throw new Error(r.message)
        toast({ title: "Login Success!", status: "success" })
        router.push("/dashboard")
      })
      .catch((e) => {
        toast({ title: e.message, status: "error" })
      })
      .finally(() => {
        setLoad(false)
      })
  }

  return (
    <Container
      as="form"
      onSubmit={onSubmit}
      justifyContent="center"
      height="100vh"
    >
      <Head>
        <title>Astarica - Dasboard login</title>
      </Head>
      <Heading>Astarica</Heading>
      <Box>Dashboard</Box>
      <VStack my={6} w="full" maxW="xs" spacing={3}>
        <Input
          variant="flushed"
          placeholder="username"
          type="text"
          required
          value={formData.username}
          onChange={({ target }) =>
            setFormData((a) => {
              return { ...a, username: target.value }
            })
          }
        />
        <Input
          variant="flushed"
          placeholder="password"
          type="password"
          required
          value={formData.password}
          onChange={({ target }) =>
            setFormData((a) => {
              return { ...a, password: target.value }
            })
          }
        />
        <Button colorScheme="teal" type="submit" w="full" isLoading={load}>
          Login
        </Button>
        <Divider />
        <Box fontSize="small">Copyright &copy; {new Date().getFullYear()}</Box>
      </VStack>
    </Container>
  )
}

export default Index
