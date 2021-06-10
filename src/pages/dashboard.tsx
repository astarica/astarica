import { Container } from "../components/Container"
import { Hero } from "../components/Hero"
import { Navbar } from "../components/Navbar"
import { Stat } from "../components/Stat"

const Dashboard = () => {
  return (
    <Container minH="100vh">
      <Navbar />
      <Hero />
      <Stat />
    </Container>
  )
}

export default Dashboard
