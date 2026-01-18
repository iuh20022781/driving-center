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
          {/* Sticky TopBar + Header */}
          <div className="sticky top-0 z-50">
            <TopBar />
            <div className="bg-white shadow-md">
              <PageContainer>
                <Header />
              </PageContainer>
            </div>
          </div>

          {/* Content */}
          <main className="min-h-screen py-6">
            <PageContainer>{children}</PageContainer>
          </main>

          <Footer />

          {/* Floating Help */}
          <FloatingHelp
            hotline="19001234"
            zaloLink="https://zalo.me/0909123456"
            facebookLink="https://m.me/yourpage"
          />

          {/* Floating Register (scroll tới RegisterForm) */}
          <FloatingRegisterNow targetId="register-form" label="Đăng ký ngay" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
