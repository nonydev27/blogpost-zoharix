/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
