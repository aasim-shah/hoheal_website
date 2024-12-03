import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "upload.wikimedia.org",
      "192.168.18.121",
      "hoheal-server.hostdonor.com",
      "aeroin.net",
    ],
  },
};

export default withNextIntl(nextConfig);
