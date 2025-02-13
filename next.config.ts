import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // experimental: {
  //   externalDir: true, // 외부 폴더도 Next.js가 인식하게 설정
  // },

  // 이미지 업로드 관련 도메인 모두 허용
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
