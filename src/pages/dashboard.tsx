import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"

import { Comment } from "../components/Comment"
import { Container } from "../components/Container"
import Head from "next/head"
import { Hero } from "../components/Hero"
import { Invitation } from "../components/Invitation"
import { MeProvider } from "../components/MeCtx"
import { Navbar } from "../components/Navbar"
import { Stat } from "../components/Stat"
import { Template } from "../components/Template"

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
        <Tabs variant="solid-rounded" w="full" colorScheme="teal">
          <TabList p={4}>
            <Tab>Setting Template</Tab>
            <Tab>Undangan</Tab>
            <Tab>Ucapan</Tab>
          </TabList>
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

export default Dashboard
