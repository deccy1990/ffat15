/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/posts',
        destination: '/posts/page/1',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
