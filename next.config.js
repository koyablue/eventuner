/** @type {import('next').NextConfig} */
const nextConfig = {
  // To avoid double execution of useEffect
  // Need to find better solutions
  reactStrictMode: false,
}

module.exports = nextConfig
