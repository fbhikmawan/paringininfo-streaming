import type { Metadata } from "next";

// Template layout
import TemplateLayout from './TemplateLayout'

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
        <TemplateLayout>
          {children}
        </TemplateLayout>
      </body>
    </html>
  );
}
