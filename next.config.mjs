/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "api.timbu.cloud",
            port: "",
          },
        ],
      },
  async headers() {
    
    return [
      {
    
        source: "/api/:path*",
        headers: [
   
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
  
};



export default nextConfig
