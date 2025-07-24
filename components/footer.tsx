import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">HEICtoPDF.shop</h3>
            <p className="text-muted-foreground mb-4">
              The fastest and most secure way to convert HEIC images to PDF online. Process your files locally with
              complete privacy and security.
            </p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} HEICtoPDF.shop. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#about-heic-pdf" className="text-muted-foreground hover:text-foreground transition-colors">
                  About HEIC & PDF
                </Link>
              </li>
              <li>
                <Link href="#why-choose-us" className="text-muted-foreground hover:text-foreground transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="#how-to-convert" className="text-muted-foreground hover:text-foreground transition-colors">
                  How to Convert
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">Email: support@heictopdf.shop</span>
              </li>
              <li>
                <span className="text-muted-foreground">Response time: 24 hours</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            This tool processes files locally in your browser. No files are uploaded to our servers, ensuring complete
            privacy and security for your images.
          </p>
        </div>
      </div>
    </footer>
  )
}
