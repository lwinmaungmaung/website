/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'lwinmaungmaung.test',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
