import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { ReactQueryProvider } from "./ReactQueryProvider";
import { AuthProvider } from "./Providers";
export const metadata = {
  title: "Wallet Control",
  description: "Wallet Control",
};

export default function RootLayout({ children }) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={inter.className}>
          <AuthProvider>{children}</AuthProvider>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
