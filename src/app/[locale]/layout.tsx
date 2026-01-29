import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import PageContainer from "@/components/layout/PageContainer";

import FloatingHelp from "@/components/layout/FloatingHelp";
import FloatingRegisterNow from "@/components/layout/FloatingRegisterNow";

import "@/app/globals.css";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let messages: any;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale} className="overflow-x-hidden" suppressHydrationWarning>
      <body
        className="bg-gray-50 text-gray-800 overflow-x-hidden"
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* ✅ FIXED header (không viền đen) */}
          <header className="fixed inset-x-0 top-0 z-[1000] bg-white shadow-sm">
            <TopBar />
            <PageContainer>
              <Header />
            </PageContainer>
          </header>

          {/* ✅ Chừa chỗ cho header */}
          <div className="pt-[132px] lg:pt-[92px]">
            <main className="min-h-screen py-6">
              <PageContainer>{children}</PageContainer>
            </main>
            <Footer />
          </div>

          {/* ✅ Floating luôn nổi */}
          <FloatingHelp
            hotline="19001234"
            zaloLink="https://zalo.me/0909123456"
            facebookLink="https://m.me/yourpage"
          />
          <FloatingRegisterNow targetId="register-form" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
