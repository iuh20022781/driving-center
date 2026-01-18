import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
 
  /* config options here */
  images: {
    domains: ["i.ytimg.com"],
  },
};

export default withNextIntl(nextConfig);
