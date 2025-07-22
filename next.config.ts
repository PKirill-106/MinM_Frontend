import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				pathname: '/**',
			},
		],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: '10mb',
		},
	},
	output: 'standalone',
}

export default nextConfig
