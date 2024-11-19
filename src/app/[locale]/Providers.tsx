import { ThemeProvider } from "@/providers/ThemeProvider";
import TopLoader from "@/components/TopLoader";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import StoreProvider from "@/providers/StoreProvider";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";
import AuthGuard from "@/components/AuthGuard";

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const messages = await getMessages();
  return (
    <ThemeProvider>
      <TopLoader />
      <StoreProvider>
        <NextIntlClientProvider messages={messages}>
          <ReactQueryClientProvider>
            <AuthGuard>{children}</AuthGuard>
          </ReactQueryClientProvider>
        </NextIntlClientProvider>
      </StoreProvider>
    </ThemeProvider>
  );
};

export default Providers;
