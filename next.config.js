/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  output: "export",
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["fakestoreapi.com"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
