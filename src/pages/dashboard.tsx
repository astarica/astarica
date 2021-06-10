import { Container } from "../components/Container"
import { Hero } from "../components/Hero"
import { Navbar } from "../components/Navbar"
import { Stat } from "../components/Stat"
import { Template } from "../components/Template"

const Dashboard = () => {
  return (
    <Container minH="100vh" bgColor="gray.100">
      <Navbar />
      <Hero />
      <Stat />
      <Template />
    </Container>
  )
}

export default Dashboard
