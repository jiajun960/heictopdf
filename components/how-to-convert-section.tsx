import { Card, CardContent } from "@/components/ui/card"
import { Upload, ArrowRight, Download } from "lucide-react"

export default function HowToConvertSection() {
  const steps = [
    {
      icon: Upload,
      title: "Upload HEIC Files",
      description:
        "Drag and drop your HEIC images or click to select them from your device. You can upload multiple files at once.",
    },
    {
      icon: ArrowRight,
      title: "Arrange & Convert",
      description:
        'Reorder your images by dragging them around. Click "Convert to PDF" to merge all images into a single PDF document.',
    },
    {
      icon: Download,
      title: "Download PDF",
      description:
        "Your PDF will be generated instantly and downloaded automatically. All processing happens in your browser.",
    },
  ]

  return (
    <section id="how-to-convert" className="py-12 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">How to Convert HEIC to PDF</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Convert your HEIC images to PDF in just three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <Card className="mb-4">
                <CardContent className="p-6">
                  <div className="relative">
                    <step.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            <strong>Pro Tip:</strong> You can drag images to reorder them before conversion. The PDF will contain pages
            in the same order as your image arrangement.
          </p>
        </div>
      </div>
    </section>
  )
}
