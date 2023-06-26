import { AuthProvider } from "@/components/auth-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createContext } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
