// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "./redux/provider"; // <-- Asegúrate de que esta línea esté presente

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gatitos ^w^",
  description: "Tu tienda de gatitos favoritos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <-- ¡MUY IMPORTANTE! Asegúrate de que children esté envuelto aquí */}
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}