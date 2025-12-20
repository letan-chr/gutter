import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Chat from "@/components/layouts/Chat";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ThemeScript } from "@/components/providers/ThemeScript";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { LanguageScript } from "@/components/providers/LanguageScript";
import { AOSProvider } from "@/components/providers/AOSProvider";
import { Language } from "@/data/utils";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const metadata: Metadata = {
  title: "Gutter Share Company",
  description:
    "Gutter Share Company is a business organization established on April 11, 2005, in accordance with the Commercial Law of Ethiopia. We are strategically located in the heart of Addis Ababa near Piassa.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read language from cookie on the server
  const cookieStore = await cookies();
  const languageCookie = cookieStore.get("language")?.value;
  const initialLanguage: Language =
    languageCookie === "en" || languageCookie === "am" ? languageCookie : "en";

  return (
    <html lang={initialLanguage} suppressHydrationWarning>
      <body className="antialiased">
        <LanguageScript initialLanguage={initialLanguage} />
        <ThemeScript />
        <ThemeProvider>
          <LanguageProvider initialLanguage={initialLanguage}>
            <AOSProvider>
              <Header />
              {children}
              <Footer />
              <Chat />
            </AOSProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
