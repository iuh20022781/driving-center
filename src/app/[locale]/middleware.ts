// middleware.ts (ở gốc dự án)
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  localePrefix: 'never',  // Không thêm /vi cho tiếng Việt
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'
  ]
};