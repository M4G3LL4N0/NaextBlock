import type { NextConfig } from "next";
import path from 'path'

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: path.resolve(__dirname),
    debugIds: process.env.NODE_ENV !== 'production'
  }
};

export default nextConfig;
