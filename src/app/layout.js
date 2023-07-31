import './globals.css'
import Script from "next/script";
import { Inter } from 'next/font/google'


const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Lwin Maung Maung',
    description: 'a note',
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={`${inter.className} min-h-screen dark:bg-black`}>{children}</body>

        {/*Google tag (gtag.js)*/}
        <Script strategy="afterInteractive" async
                src="https://www.googletagmanager.com/gtag/js?id=G-9907KH2CZX"></Script>
        <Script id='google-analytics'
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-${process.env.GA4_CODE}', {
            page_path: window.location.pathname,
          });
        `,
                }}
        >
        </Script>

        </html>
    )
}
