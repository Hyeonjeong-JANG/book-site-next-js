/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // React의 엄격 모드를 비활성화합니다.
  eslint: {
    ignoreDuringBuilds: true, // ESLint를 빌드 중에도 무시합니다.
  },
};

export default nextConfig;
