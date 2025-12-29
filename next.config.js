/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'smysl-bakery-directus.onrender.com',
				pathname: '/assets/**',
			},
		],
	},
};

module.exports = nextConfig;
