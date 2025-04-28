import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import { QueryProvider } from "../services/QueryProvider";
import { AuthProvider } from "../hooks/useAuth";

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <QueryProvider>
          <AuthProvider>
            <div className="flex h-[calc(100vh-64px)] lg:flex-row flex-col overflow-hidden">
              <Navbar />
              <main className="flex-1 bg-gray-100 p-4 overflow-y-scroll scrollbar-hide">
                {children}
              </main>
            </div>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
