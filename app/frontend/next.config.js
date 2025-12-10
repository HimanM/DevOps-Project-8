/** @type {import('next').NextConfig} */
const isGithubPages = process.env.NEXT_PUBLIC_DEPLOY_SOURCE === 'github-pages';

const nextConfig = {
    ...(isGithubPages
        ? {
            output: 'export',
            images: {
                unoptimized: true
            }
        }
        : {
            output: 'standalone',
        }
    ),
};

module.exports = nextConfig;
