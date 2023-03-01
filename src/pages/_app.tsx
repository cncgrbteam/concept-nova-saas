import "@styles/globals.scss";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import { AlertProvider, AuthProvider } from "@context";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <AuthProvider>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </AlertProvider>
    </QueryClientProvider>
  );
}
