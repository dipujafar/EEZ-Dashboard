import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import antTheme from "@/theme/antTheme";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import Providers from "@/lib/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard | EEZ",
    template: "%s | SoleSwap",
  },
  description: "This is Official Application Dashboard for SoleSwap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <AntdRegistry>
            <ConfigProvider theme={antTheme}>
              <Toaster position="top-center" />
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}
