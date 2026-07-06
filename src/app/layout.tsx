import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteMeta } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: {
    default: `${siteMeta.name} - Brainrots, Traits, Values & Events`,
    template: `%s | ${siteMeta.name}`,
  },
  description: siteMeta.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteMeta.name} - Brainrots, Traits, Values & Events`,
    description: siteMeta.description,
    url: siteMeta.url,
    type: "website",
    locale: "en_US",
    siteName: siteMeta.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteMeta.name} - Brainrots, Traits, Values & Events`,
    description: siteMeta.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className="min-h-full flex flex-col bg-background text-foreground antialiased"
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Script id="site-structured-data" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteMeta.name,
            url: siteMeta.url,
            description: siteMeta.description,
            about: {
              "@type": "VideoGame",
              name: siteMeta.gameName,
            },
          })}
        </Script>
      </body>
    </html>
  );
}
