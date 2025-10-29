/** @type {import('next').NextConfig} */
const nextConfig = {
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
	output: 'export',
	distDir: 'build',
}

export default nextConfig
