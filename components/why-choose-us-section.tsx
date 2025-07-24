import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Heart, Lock } from "lucide-react"

export default function WhyChooseUsSection() {
  const features = [
    {
      icon: Lock,
      title: "Complete Privacy",
      description:
        "Your files never leave your device. All conversion happens locally in your browser for maximum security.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "No upload or download delays. Convert your HEIC files to PDF instantly without waiting for server processing.",
    },
    {
      icon: Heart,
      title: "100% Free",
      description:
        "No hidden fees, no subscriptions, no watermarks. Convert unlimited HEIC files to PDF completely free.",
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description:
        "No registration required. Your images remain private and secure throughout the entire conversion process.",
    },
  ]

  return (
    <section id="why-choose-us" className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
            Why Choose Our HEIC to PDF Converter?
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            The most secure, fast, and user-friendly way to convert your HEIC images to PDF
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
