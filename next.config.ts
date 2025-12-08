import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ИГНОРИРОВАТЬ ОШИБКИ TYPESCRIPT ПРИ СБОРКЕ
  },
  eslint: {
    ignoreDuringBuilds: true, // ИГНОРИРОВАТЬ ОШИБКИ ESLINT ПРИ СБОРКЕ
  }
}

module.exports = nextConfig

export default nextConfig;
