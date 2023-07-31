/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        // Important: return the modified config
        return config
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.lwinmaungmaung.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
