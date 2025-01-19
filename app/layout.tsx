import type { Metadata } from "next";

import { Toaster } from "react-hot-toast";

// Template Sections
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';

// Template Elements
import ButtonScrollToTop from '../components/elements/ButtonScrollToTop';
import Preloader from '../components/elements/Preloader';

// Template Scripts
import TemplateScripts from './TemplateScripts';

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = process.env.NEXT_PUBLIC_METADATA_BASE_URL || 'http://localhost:3000';

  return {
    title: "ParinginInfo | Online Movies, Series, Sports & Live Streaming",
    description: "Description for ParinginInfo | Online Movies, Series & Live",
    metadataBase: new URL(metadataBase),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/',
        'id-ID': '/id',
      },
    },
    openGraph: {
      images: '/og-image.png',
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <ButtonScrollToTop />
        <Header/>

        <main>
          {children}
        </main>

        <Footer />
        <TemplateScripts />
        <Toaster />
      </body>
    </html>
  );
}
