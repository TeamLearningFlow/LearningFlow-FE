import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // experimental: {
  //   externalDir: true, // 외부 폴더도 Next.js가 인식하게 설정
  // },

  // 이미지 업로드 관련 도메인 모두 허용
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: '**',
  //     },
  //   ],
  // },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ibb.co',
      },
      { protocol: 'https', hostname: 'i.ibb.co' },
      {
        protocol: 'https',
        hostname: 'velog.velcdn.com',
      },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'greenart.co.kr' },
      { protocol: 'https', hostname: 'postfiles.pstatic.net' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'png.pngtree.com' },
      { protocol: 'https', hostname: 'blog.kakaocdn.net' },
      { protocol: 'https', hostname: 'img1.daumcdn.net' },
      { protocol: 'https', hostname: 'onboarding.p-e.kr' }, // 백엔드 도메인
      {
        protocol: 'https',
        hostname: 'learningflow.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
