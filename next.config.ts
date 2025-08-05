import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'https://rueyhshgzmuerdeezlto.storage.supabase.co/storage/v1/s3', 
      'rueyhshgzmuerdeezlto.supabase.co'
    ],

  },
};

export default nextConfig;
