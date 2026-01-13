import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/Footer";
import PageContainer from "@/components/layout/PageContainer";
// import FloatingHelp from "@/components/chat/FloatingHelp"; // ✅ thêm nút chat nổi

import "@/app/globals.css";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="bg-gray-50 text-gray-800">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* ✅ Sticky TopBar + Header (không bị cuộn) */}
          <div className="sticky top-0 z-50">
            <TopBar />

            <div className="bg-white shadow-md">
              <PageContainer>
                <Header />
              </PageContainer>
            </div>
          </div>

          {/* ✅ Content nằm trong giới hạn */}
          <main className="min-h-screen py-6">
            <PageContainer>{children}</PageContainer>
          </main>

          <Footer />

          {/* ✅ Chat nổi (Chat trực tuyến / Facebook / Zalo) */}
          {/* <FloatingHelp /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
