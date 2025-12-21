import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "../globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { ReactNode } from "react";
import { ThemeProviders } from "@/components/ThemeProviders";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Cloud Hosting",
  description: "Cloud hosting project",
};

type Props = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};



export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={`${outfit.className} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProviders>
            <Header />
            <ToastContainer theme="colored" position="top-center" />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ThemeProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
