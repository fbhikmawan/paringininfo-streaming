import { Poppins } from 'next/font/google'
import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'

// Template Sections
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';

// Template Elements
import ButtonScrollToTop from '../components/elements/ButtonScrollToTop';
import Preloader from '../components/elements/Preloader';

// Template Scripts
import TemplateScripts from './TemplateScripts';

// Template Styles
import "../assets/css/bootstrap.min.css";
import "../assets/css/default.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";

// FontAwesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import RuntimeScripts from './RuntimeScripts';
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
    title: "Sanggam Streaming | Online Movies, Series, Sports & Live Streaming",
    description: "Discover endless entertainment with Sanggam Streaming. Stream movies, series, and live events in high quality!",
    metadataBase: new URL(metadataBase),
    alternates: {
      canonical: '/',
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isGAEnabled = process.env.GA_ENABLED === 'yes';
  const gaId = process.env.GA_ID || 'DEFAULT_GA_ID';

  return (
    <html lang="en" className={poppins.className}>
      <body>
        <RuntimeScripts>
          <Preloader />
          <ButtonScrollToTop />
          <Header/>

          <main>
            {children}
          </main>

          <Footer />
        </RuntimeScripts>
        <TemplateScripts />
        {isGAEnabled && gaId !== 'DEFAULT_GA_ID' && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
