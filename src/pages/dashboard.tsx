import { MeCtx, MeProvider } from "../components/MeCtx"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"

import { Comment } from "../components/Comment"
import { Container } from "../components/Container"
import Head from "next/head"
import { Hero } from "../components/Hero"
import { Invitation } from "../components/Invitation"
import { Navbar } from "../components/Navbar"
import { Stat } from "../components/Stat"
import { Template } from "../components/Template"
import { useContext } from "react"

const Dashboard = () => {
  return (
    <MeProvider>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Container minH="100vh" bgColor="gray.100">
        <Navbar />
        <Hero />
        <Stat />
        <Tabs w="full" colorScheme="teal">
          <TabMenu />
          <TabPanels bg="gray.200">
            <TabPanel>
              <Template />
            </TabPanel>
            <TabPanel>
              <Invitation />
            </TabPanel>
            <TabPanel>
              <Comment />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </MeProvider>
  )
}

const TabMenu = () => {
  const { me } = useContext(MeCtx)
  return (
    <TabList>
      <Tab _focus={{ fontWeight: "bold", bgColor: "gray.200" }} fontSize="sm">
        Setting Template
      </Tab>
      <Tab _focus={{ fontWeight: "bold", bgColor: "gray.200" }} fontSize="sm">
        Undangan ({me.invitations.length})
      </Tab>
      <Tab _focus={{ fontWeight: "bold", bgColor: "gray.200" }} fontSize="sm">
        Ucapan ({me.comments.length})
      </Tab>
    </TabList>
  )
}

export default Dashboard
