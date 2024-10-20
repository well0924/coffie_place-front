"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/common/footer"
import Header from "../components/common/header"
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Script from "next/script";
import CustomErrorBoundary from "../components/ErrorBoundary";
import ReactQueryProviders from "@/utile/ReactQueryProvider";
import { AuthProvider } from "@/utile/context/AuthContext";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });


console.log('Kakao Maps API Key:', process.env.NEXT_PUBLIC_APP_JS_KEY);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <Script type="text/javascript" strategy="beforeInteractive" src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_APP_JS_KEY}&autoload=false`}></Script>
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <CustomErrorBoundary>
          <AuthProvider>
            <Header />
            <div className="flex flex-col min-h-screen">
              <main className="flex-grow pt-8 pb-8 px-4"> {/* 여백 설정 */}
                <ReactQueryProviders>
                  {children}
                </ReactQueryProviders>
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </CustomErrorBoundary>
      </body>
    </html>
  );
}
