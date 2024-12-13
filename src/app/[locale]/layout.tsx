import "../globals.css";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import Providers from "./Providers";
import { baseUrl } from "@/constants";
import axios from "axios";
import Error from "@/components/Error";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const poppins = localFont({
  src: [
    {
      path: "../fonts/poppins/Poppins-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/poppins/Poppins-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../fonts/poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/poppins/Poppins-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/poppins/Poppins-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/poppins/Poppins-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../fonts/poppins/Poppins-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/poppins/Poppins-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../fonts/poppins/Poppins-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/poppins/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/poppins/Poppins-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/poppins/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/poppins/Poppins-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/poppins/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/poppins/Poppins-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/poppins/Poppins-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/poppins/Poppins-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "HOHEAL",
  description: "Admin, owner and management dashboard for HOHEAL",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  let serverIsOnline = false;
  const checkServer = async () => {
    try {
      await axios.get(baseUrl as string).then((response) => {
        if (response.status === 200) {
          serverIsOnline = true;
        }
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  await checkServer();
  const language = locale || "en";

  return (
    <html lang={language}>
      <body
        className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden`}
      >
        <Providers language={language}>
          {serverIsOnline ? (
            <main>{children}</main>
          ) : (
            <Error message="Server is offline" icon={false} />
          )}
        </Providers>
      </body>
    </html>
  );
}
