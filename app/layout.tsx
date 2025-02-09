import { Poppins } from 'next/font/google'
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

// User Management Clerk
import { ClerkProvider } from '@clerk/nextjs'

// Template Sections
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';

// Template Elements
import ButtonScrollToTop from '../components/elements/ButtonScrollToTop';
import Preloader from '../components/elements/Preloader';

// Template Scripts
import TemplateScripts from './TemplateScripts';

// FontAwesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  subsets: ['latin', 'latin-ext']
});

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = process.env.NEXT_PUBLIC_METADATA_BASE_URL || 'http://localhost:3000';

  return {
    title: "ParinginInfo | Online Movies, Series, Sports & Live Streaming",
    description: "Discover endless entertainment with ParinginInfo. Stream movies, series, and live events in high quality!",
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
    <ClerkProvider>
      <html lang="en" className={poppins.className}>
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
    </ClerkProvider>
  );
}
