/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  images: {
    domains: [
      "upload.wikimedia.org",
      "192.168.18.121",
      "aeroin.net",
      "hoheal-server.hostdonor.com",
      "hoheal-server.hostdonor.com",
      "aeroin.net",
    ],
  },
};

export default withNextIntl(nextConfig);
