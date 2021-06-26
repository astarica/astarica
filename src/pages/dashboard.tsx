import { Comment } from "../components/Comment"
import { Container } from "../components/Container"
import { Hero } from "../components/Hero"
import { Invitation } from "../components/Invitation"
import { MeProvider } from "../components/MeCtx"
import { Navbar } from "../components/Navbar"
import { Stat } from "../components/Stat"
import { Template } from "../components/Template"

const Dashboard = () => {
  return (
    <MeProvider>
      <Container minH="100vh" bgColor="gray.100">
        <Navbar />
        <Hero />
        <Stat />
        <Template />
        <Invitation />
        <Comment />
      </Container>
    </MeProvider>
  )
}

export default Dashboard
