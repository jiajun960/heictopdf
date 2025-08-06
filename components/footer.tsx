import Link from "next/link"
import Logo from "./logo"

export default function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* LOGO+简介 */}
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <Logo size="md" showText={true} />
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              The fastest and most secure way to convert HEIC images to PDF online. Process your files locally with complete privacy and security.
            </p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} HEICtoPDF.shop. All rights reserved.
            </p>
          </div>
          {/* Quick Links */}
          <div className="text-center">
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
          {/* Support */}
          <div className="text-center">
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">Email: yiner2396@gmail.com</span>
              </li>
              <li>
                <span className="text-muted-foreground">Response time: 24 hours</span>
              </li>
            </ul>
          </div>
          {/* More Tools */}
          <div className="text-center">
            <h4 className="font-semibold mb-4">More Tools</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.tiktokemojis.pics/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title="Discover and copy all hidden TikTok emojis. Boost your TikTok engagement with secret emoji codes!"
                >
                  TikTok Emoji Explorer
                </a>
              </li>
              <li>
                <a
                  href="http://theskipto.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title="A curated directory of essential tools for indie developers. Find the best resources for every stage of your project."
                >
                  SkipTo Toolbox
                </a>
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
