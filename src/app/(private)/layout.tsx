import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import { QueryProvider } from "../services/QueryProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ITAFOS CREDITO",
  description: "Cadastro de analise de credito ITAFOS",
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
        <div className="flex flex-row h-screen">
          <div className="w-[20%] bg-gray-200 p-4">
            <Navbar />
          </div>
          <div className="flex-1 bg-gray-100 p-4">
            <QueryProvider>
              {children}
            </QueryProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
