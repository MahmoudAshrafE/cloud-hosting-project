import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import "../globals.css";
import Header from '@/components/header/Header'
import Footer from "@/components/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Cloud Hosting",
  description: "Cloud hosting project",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className="dark">
      <body className={`${outfit.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <ToastContainer theme="colored" position="top-center" />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
