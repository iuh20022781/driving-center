'use client';

import { useTranslations } from 'next-intl';
import { House, Clock, Phone, Mail, Facebook, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <House className="w-8 h-8" />
              {t('main-office')}
            </h3>
            <p className="mb-4">Lô Dây Thép, Long Hòa B, Long Định, Đồng Tháp (Tiền Giang cũ)</p>
            <div className="space-y-2 mb-6">
              <p className="flex items-center gap-3"><Clock className="w-5 h-5" />VP ghi danh: 07:30 - 17:00</p>
              <p className="flex items-center gap-3"><Clock className="w-5 h-5" />Sân tập lái: 07:30 - 18:00</p>
              <p className="flex items-center gap-3"><Phone className="w-5 h-5" />0273.386.8888 - 0919.555.678</p>
              <p className="flex items-center gap-3"><Mail className="w-5 h-5" />info@daylaixesongtien.vn</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">{t('my-tho-office')}</h3>
            <p className="mb-4">Căn PG 02-10, khu Vincom, 1A, Hùng Vương, Mỹ Tho, Đồng Tháp (Tiền Giang cũ)</p>
            <div className="space-y-2 mb-6">
              <p className="flex items-center gap-3"><Clock className="w-5 h-5" />07:30 - 17:00</p>
              <p className="flex items-center gap-3"><Phone className="w-5 h-5" />0273.383.9999 - 0919.555.678</p>
              <p className="flex items-center gap-3"><Mail className="w-5 h-5" />info@daylaixesongtien.vn</p>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} {t('copyright')}</p>
          <div className="flex gap-6 text-3xl">
            <Link href="#" className="hover:text-yellow-300 transition"><Facebook className="w-8 h-8" /></Link>
            <Link href="#" className="hover:text-yellow-300 transition"><Youtube className="w-8 h-8" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}