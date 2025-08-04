import type { Metadata } from "next";

import "./globals.css";
import { geistMono, geistSans } from "@/config/fonts";
import { Footer } from "@/components";

export const metadata: Metadata = {
  title: {
    template: "%s - Teslo | Shop", // hace referencia a que todas las pantallas van a tener el titulo propio mas el teslo shop
    default: "Home - Teslo | Shop",
  },
  description: "Tienda virtual de productos deportivos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
