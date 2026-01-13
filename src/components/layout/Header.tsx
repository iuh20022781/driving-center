// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { Search, Menu, LogIn, ChevronDown } from 'lucide-react';
// import { useTranslations } from 'next-intl';

// export default function Header() {
//   const t = useTranslations('Header');

//   // Dịch các phần dropdown
//   const courses = t.raw('dropdown.khoa-hoc');
//   const register = t.raw('dropdown.dang-ky-hoc');
//   const news = t.raw('dropdown.tin-tuc');
//   const students = t.raw('dropdown.hoc-vien');
//   const contact = t.raw('dropdown.lien-he');

//   return (
//     <header className="bg-white shadow-md">
//       <div className="container mx-auto flex items-center justify-between px-4 py-5">
//         {/* LOGO */}
//         <Link href="/" className="flex items-center">
//           <Image
//             src="/image/logo.png"
//             alt="Song Tien Driving School"
//             width={220}
//             height={60}
//             priority
//             className="object-contain hover:opacity-90 transition"
//           />
//         </Link>

//         {/* MENU DESKTOP */}
//         <nav className="hidden lg:flex items-center gap-8 text-lg font-medium">
//           <Link href="/" className="hover:text-blue-600 transition">
//             {t('menu.gioi-thieu')}
//           </Link>

//           {/* Dropdown Khóa học – KHÔNG ICON */}
//           <div className="relative group">
//             <button className="flex items-center gap-1 hover:text-blue-600 transition">
//               {t('menu.khoa-hoc')}
//               <ChevronDown className="w-5 h-5 transition group-hover:rotate-180" />
//             </button>
//             <div className="absolute left-0 top-full mt-2 w-80 bg-white shadow-xl rounded-lg py-4 px-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
//               <div className="font-bold text-lg mb-3 border-b pb-2">{courses.title}</div>
//               <ul className="space-y-3 text-gray-800">
//                 <li>
//                   <Link href="/khoa-hoc/a1" className="hover:text-blue-600 transition">
//                     {courses.a1}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/khoa-hoc/a" className="hover:text-blue-600 transition">
//                     {courses.a}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/khoa-hoc/b1" className="hover:text-blue-600 transition">
//                     {courses.b1}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/khoa-hoc/b" className="hover:text-blue-600 transition">
//                     {courses.b}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/khoa-hoc/c1" className="hover:text-blue-600 transition">
//                     {courses.c1}
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/khoa-hoc/c" className="hover:text-blue-600 transition">
//                     {courses.c}
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Dropdown Đăng ký học */}
//           <div className="relative group">
//             <button className="flex items-center gap-1 hover:text-blue-600 transition">
//               {t('menu.dang-ky-hoc')}
//               <ChevronDown className="w-5 h-5 transition group-hover:rotate-180" />
//             </button>
//             <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-xl rounded-lg py-4 px-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
//               <ul className="space-y-3 text-gray-800">
//                 <li><Link href="/dang-ky/nop-ho-so" className="hover:text-blue-600 transition">{register['nop-ho-so-truc-tuyen']}</Link></li>
//                 <li><Link href="/dang-ky/hoi-dap" className="hover:text-blue-600 transition">{register['hoi-dap']}</Link></li>
//                 <li><Link href="/dang-ky/tra-cuu" className="hover:text-blue-600 transition">{register['tra-cuu-thong-tin-hoc-vien']}</Link></li>
//               </ul>
//             </div>
//           </div>

//           {/* Dropdown Tin tức */}
//           <div className="relative group">
//             <button className="flex items-center gap-1 hover:text-blue-600 transition">
//               {t('menu.tin-tuc')}
//               <ChevronDown className="w-5 h-5 transition group-hover:rotate-180" />
//             </button>
//             <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-xl rounded-lg py-4 px-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
//               <ul className="space-y-3 text-gray-800">
//                 <li><Link href="/tin-tuc/thong-bao" className="hover:text-blue-600 transition">{news['thong-bao']}</Link></li>
//                 <li><Link href="/tin-tuc/lich-thi" className="hover:text-blue-600 transition">{news['lich-thi']}</Link></li>
//                 <li><Link href="/tin-tuc/so-bao-danh" className="hover:text-blue-600 transition">{news['so-bao-danh']}</Link></li>
//               </ul>
//             </div>
//           </div>

//           {/* Dropdown Học viên */}
//           <div className="relative group">
//             <button className="flex items-center gap-1 hover:text-blue-600 transition">
//               {t('menu.hoc-vien')}
//               <ChevronDown className="w-5 h-5 transition group-hover:rotate-180" />
//             </button>
//             <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-xl rounded-lg py-4 px-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
//               <ul className="space-y-3 text-gray-800">
//                 <li><Link href="/hoc-vien/on-tap-o-to" className="hover:text-blue-600 transition">{students['on-tap-o-to']}</Link></li>
//                 <li><Link href="/hoc-vien/on-tap-mo-to" className="hover:text-blue-600 transition">{students['on-tap-mo-to']}</Link></li>
//                 <li><Link href="/hoc-vien/tai-lieu" className="hover:text-blue-600 transition">{students['tai-lieu-phan-mem']}</Link></li>
//                 <li><Link href="/hoc-vien/dang-ky-cabin" className="hover:text-blue-600 transition">{students['dang-ky-cabin']}</Link></li>
//                 <li><Link href="/hoc-vien/dang-ky-xe-cam-bien" className="hover:text-blue-600 transition">{students['dang-ky-xe-cam-bien']}</Link></li>
//               </ul>
//             </div>
//           </div>

//           {/* Dropdown Liên hệ */}
//           <div className="relative group">
//             <button className="flex items-center gap-1 hover:text-blue-600 transition">
//               {t('menu.lien-he')}
//               <ChevronDown className="w-5 h-5 transition group-hover:rotate-180" />
//             </button>
//             <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-xl rounded-lg py-4 px-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
//               <ul className="space-y-3 text-gray-800">
//                 <li><Link href="/lien-he" className="hover:text-blue-600 transition">{contact['lien-he']}</Link></li>
//                 <li><Link href="/tuyen-dung" className="hover:text-blue-600 transition">{contact['tuyen-dung']}</Link></li>
//               </ul>
//             </div>
//           </div>

//           <Search className="w-6 h-6 hover:text-blue-600 cursor-pointer transition" />

//           {/* ĐĂNG NHẬP */}
//           <Link
//             href="/dang-nhap"
//             className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
//           >
//             <LogIn className="w-5 h-5" />
//             {t('menu.dang-nhap')}
//           </Link>
//         </nav>

//         {/* MOBILE MENU ICON */}
//         <Menu className="lg:hidden w-8 h-8 text-blue-800 cursor-pointer" />
//       </div>
//     </header>
//   );
// }