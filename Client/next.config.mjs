// frontend/next.config.mjs
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      // Keep placehold.co if you might use it again, or remove it
      // {
      //   protocol: 'https',
      //   hostname: 'placehold.co',
      // },
       {
        protocol: 'http',
        hostname: 'localhost', // Allow localhost if needed for dev images
      },
       // Add the new pattern for via.placeholder.com
       {
         protocol: 'https',
         hostname: 'via.placeholder.com',
       },
      // Add other patterns for your actual image hosts later
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
     // Ensure dangerouslyAllowSVG is NOT set or is false
     // dangerouslyAllowSVG: true, // REMOVE or comment out this line
  },
  // ... rest of config
};

export default nextConfig;