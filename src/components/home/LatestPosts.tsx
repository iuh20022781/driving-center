'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function LatestPosts() {
  const t = useTranslations('LatestPosts');

  const posts = [
    {
      img: '/images/sanpham.png',
      date: '08 Th9',
      title: 'TT DỊCH VỤ VIỆC LÀM ĐỒNG THÁP TUYỂN DỤNG: 30 nhân viên lái xe làm việc nước ngoài',
      desc: '...',
    },
    {
      img: '/images/sanpham.png',
      date: '17 Th5',
      title: 'Công an tỉnh Tiền Giang lần đầu tổ chức một Kỳ thi sát hạch lái xe ô tô',
      desc: 'Công an tỉnh Tiền Giang lần đầu tổ chức Kỳ thi sát hạch lái xe...',
    },
    {
      img: '/images/sanpham.png',
      date: '07 Th5',
      title: 'Hướng dẫn Thực hành trong hình hạng C',
      desc: '...',
    },
    {
      img: '/images/sanpham.png',
      date: '07 Th5',
      title: 'Hướng dẫn Thực hành trong hình hạng B',
      desc: '...',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-12 uppercase">
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-4">
                <Image
                  src={post.img}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-md font-bold">
                  {post.date}
                </div>
              </div>
              <h3 className="text-lg font-bold text-blue-900 line-clamp-3 group-hover:text-blue-600 transition">
                {post.title}
              </h3>
              {post.desc !== '...' && (
                <p className="text-sm text-gray-600 mt-2">{post.desc}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}