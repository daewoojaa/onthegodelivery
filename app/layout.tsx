import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import RegisterSW from "./register-sw";

export const metadata: Metadata = {
  title: "ON-THE-GO DELIVERY",
  description: "แอปคนขับสำหรับงานจัดส่ง — นำทางและแจ้งเตือนงานค้าง",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "ON-THE-GO" },
};

export const viewport: Viewport = {
  themeColor: "#0d0f10",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Barlow+Condensed:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
