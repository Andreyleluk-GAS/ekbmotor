import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Advantages } from "@/components/advantages"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { BackToTop } from "@/components/back-to-top"
import { MobileCallButton } from "@/components/mobile-call-button"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <About />
      <Advantages />
      <Contact />
      <Footer />
      <BackToTop />
      <MobileCallButton />
    </main>
  )
}
