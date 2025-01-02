import type { Metadata } from "next";

// Template layout
import TemplateLayout from './TemplateLayout'

export const metadata: Metadata = {
  title: "Movflx - Online Movies & TV Shows Template",
  description: "Description for Movflx - Online Movies & TV Shows Template",
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
