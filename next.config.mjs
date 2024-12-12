import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "upload.wikimedia.org",
      "192.168.18.121",
      "aeroin.net",
      "hoheal-server.hostdonor.com",
      "hoheal-server.hostdonor.com",
      "aeroin.net",
      "sh367bt5.inc1.devtunnels.ms",
    ],
  },
};

export default withNextIntl(nextConfig);
