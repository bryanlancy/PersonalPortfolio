/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'upload.wikimedia.org',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'tenor.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'media2.giphy.com',
				pathname: '/**',
			},
		],
	},
}

export default nextConfig
