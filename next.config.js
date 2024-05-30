/** @type {import('next').NextConfig} */

// next.config.js
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.bildelsbasen.se',
        port: '',
      },
      {
        hostname: '**.gstatic.com',
        port: '',
      },
      {
        hostname: 'www.google.com',
        port: '',
      },
      {
        hostname: '**.googleusercontent.com',
        port: '',
      },
    ],
  },
};

const nextTranslate = require('next-translate-plugin');
module.exports = nextTranslate(config);
