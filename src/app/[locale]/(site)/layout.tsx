import TopBar from "@/components/layout/site/TopBar";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import PageContainer from "@/components/layout/site/PageContainer";
import FloatingHelp from "@/components/layout/site/FloatingHelp";
import FloatingRegisterNow from "@/components/layout/site/FloatingRegisterNow";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[1000] bg-white shadow-sm">
        <TopBar />
        <PageContainer>
          <Header />
        </PageContainer>
      </header>

      <div className="pt-[132px] lg:pt-[92px]">
        <main className="min-h-screen py-6">
          <PageContainer>{children}</PageContainer>
        </main>
        <Footer />
      </div>

      <FloatingHelp
        hotline="19001234"
        zaloLink="https://zalo.me/0909123456"
        facebookLink="https://m.me/yourpage"
      />
      <FloatingRegisterNow targetId="register-form" />
    </>
  );
}
