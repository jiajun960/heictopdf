import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HEICtoPDF.shop - Convert HEIC to PDF Online',
  description: 'Fast, free, and secure HEIC to PDF conversion in your browser. No upload required - process files locally.',
  generator: 'Next.js',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) - 延迟加载 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VVGDWN5YDN"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-VVGDWN5YDN', {
            page_title: document.title,
            page_location: window.location.href
          });
        ` }} />
        {/* Microsoft Clarity - 延迟加载 */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "slraxjos5c");
        ` }} />
        {/* Ahrefs Web Analytics - 延迟加载 */}
        <script async src="https://analytics.ahrefs.com/analytics.js" data-key="F89E0S0dK8m2Ju7RSfiy8w"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
