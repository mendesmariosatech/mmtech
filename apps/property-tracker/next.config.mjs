/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["@repo/ui", "@repo/zod-types", "@repo/hook-services"],
};

export default nextConfig;