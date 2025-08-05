import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import WhyChooseUsSection from "@/components/why-choose-us-section"
import HowToConvertSection from "@/components/how-to-convert-section"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Convert HEIC to PDF Online - Fast & Free HEIC to PDF Converter | HEICtoPDF.shop",
  description:
    "Convert HEIC images to PDF online for free. Fast, secure, and private HEIC to PDF conversion in your browser. No upload required - process files locally.",
  keywords: "heic to pdf, convert heic to pdf, heic pdf converter, online heic converter, free pdf converter",
  openGraph: {
    title: "Convert HEIC to PDF Online - HEICtoPDF.shop",
    description: "Fast, free, and secure HEIC to PDF conversion in your browser",
    url: "https://www.heictopdf.shop",
    siteName: "HEICtoPDF.shop",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert HEIC to PDF Online - HEICtoPDF.shop",
    description: "Fast, free, and secure HEIC to PDF conversion in your browser",
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <WhyChooseUsSection />
      <HowToConvertSection />
      <Footer />
    </main>
  )
}
