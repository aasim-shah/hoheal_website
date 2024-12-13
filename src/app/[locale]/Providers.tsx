import AuthGuard from "@/components/AuthGuard";
import FetchData from "@/components/FetchData";
import TopLoader from "@/components/TopLoader";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";
import StoreProvider from "@/providers/StoreProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const Providers = async ({
  language,
  children,
}: {
  language: string;
  children: React.ReactNode;
}) => {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider locale={language} messages={messages}>
      <ThemeProvider>
        <TopLoader />
        <StoreProvider>
          <ReactQueryClientProvider>
            <TooltipProvider>
              <AuthGuard>
                <FetchData />
                {children}
              </AuthGuard>
              <Toaster />
            </TooltipProvider>
          </ReactQueryClientProvider>
        </StoreProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

export default Providers;
