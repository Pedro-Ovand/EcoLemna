import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProcessSection } from "@/components/process-section"
import { FormatsSection } from "@/components/formats-section"
import { BenefitsSection } from "@/components/benefits-section"
import { ComparisonSection } from "@/components/comparison-section"
import { GallerySection } from "@/components/gallery-section"
import { Footer } from "@/components/footer"
import { ChatbotBubble } from "@/components/chatbot-bubble"

export default function EcoLemnaLanding() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProcessSection />
      <FormatsSection />
      <BenefitsSection />
      <ComparisonSection />
      <GallerySection />
      <Footer />
      <ChatbotBubble />
    </main>
    
  )
}
