/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "api.timbu.cloud",
            port: "",
          },
          {
            protocol: "https",
            hostname: "undraw.co",
            port: "",
          },
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
            port: "",
          },
          {
            protocol: "https",
            hostname: "via.placeholder.com", // ✅ Added this line
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
