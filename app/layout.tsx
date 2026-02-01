import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Home/Footer";
import Header from "@/components/shared/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kometstudyabroad.com";
const META_IMAGE = "/Images/Logo/Komet_Meta_Image.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Komet Study Abroad | Study Abroad Consultants",
    template: "%s | Komet Study Abroad",
  },
  description:
    "Komet Study Abroad helps students make confident study abroad decisions. Expert counselling, university applications, visa support, and test preparation for UK, Australia, Canada & more.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Komet Study Abroad",
    title: "Komet Study Abroad | Study Abroad Consultants",
    description:
      "Komet Study Abroad helps students make confident study abroad decisions. Expert counselling, university applications, visa support, and test preparation.",
    images: [{ url: META_IMAGE, width: 500, height: 500, alt: "Komet Study Abroad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Komet Study Abroad | Study Abroad Consultants",
    description: "Expert study abroad counselling, applications, visa & test prep.",
    images: [META_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
