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

export const metadata: Metadata = {
  title: "ParinginInfo | Online Movies, Series & Live",
  description: "Description for ParinginInfo | Online Movies, Series & Live",
};

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
