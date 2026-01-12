import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    template: "%s | AESBEADS Online Store",
    default: "AESBEADS Online Store",
  },
  description: "AESBEADS Online Store,Your one stop shop for all your handmade jewellery needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <Providers>
          <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          </div>
        </Providers>
  );
}
