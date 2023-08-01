/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const { version } = require('./package.json');


module.exports = {
  publicRuntimeConfig: {
    version,
  },
};