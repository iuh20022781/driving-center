'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Mail, Phone, Facebook, Youtube, Globe } from 'lucide-react';

export default function TopBar() {
  const t = useTranslations('TopBar');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (newLocale: string) => {
    const newPath = pathname.replace(/^\/(vi|en)/, '');
    router.push(`/${newLocale}${newPath}`);
  };

  return (
    <div className="bg-blue-700 text-white text-sm">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 py-2 gap-3">
        <div className="flex flex-wrap justify-center sm:justify-start gap-6">
          <span className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {t('email')}
          </span>
          <span className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            {t('hotline')}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="#" className="flex items-center gap-2 hover:text-yellow-300 transition">
            <Facebook className="w-5 h-5" />
            Facebook
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:text-yellow-300 transition">
            <Youtube className="w-5 h-5" />
            Youtube
          </Link>

          <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
            <Globe className="w-4 h-4" />
            <button
              onClick={() => changeLanguage('vi')}
              className={`font-medium ${locale === 'vi' ? 'text-yellow-300' : 'hover:text-yellow-300'}`}
            >
              VI
            </button>
            <span className="text-white/60">|</span>
            <button
              onClick={() => changeLanguage('en')}
              className={`font-medium ${locale === 'en' ? 'text-yellow-300' : 'hover:text-yellow-300'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}