/** @type {import('next').NextConfig} */

const { version } = require('./package.json');


module.exports = {
  publicRuntimeConfig: {
    version,
  },
};