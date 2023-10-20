/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'this-person-does-not-exist.com',
            'thispersondoesnotexist.com',
            'i.imgur.com'
        ]
    },
}

module.exports = nextConfig
