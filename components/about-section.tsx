import { Card, CardContent } from "@/components/ui/card"
import { FileImage, FileText } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about-heic-pdf" className="py-12 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">About HEIC and PDF Formats</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
            Understanding the formats you&apos;re working with
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <FileImage className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">HEIC Format</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                HEIC (High Efficiency Image Container) is Apple&apos;s modern image format that provides better compression
                than JPEG while maintaining high quality.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Default format for iPhone photos since iOS 11</li>
                <li>• Up to 50% smaller file sizes than JPEG</li>
                <li>• Supports advanced features like Live Photos</li>
                <li>• Limited compatibility with non-Apple devices</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <FileText className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">PDF Format</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                PDF (Portable Document Format) is a universal file format that preserves document formatting across all
                devices and platforms.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Universal compatibility across all devices</li>
                <li>• Maintains image quality and layout</li>
                <li>• Perfect for sharing and archiving</li>
                <li>• Supports multiple pages in one file</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
