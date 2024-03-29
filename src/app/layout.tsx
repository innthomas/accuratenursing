import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
 

export const metadata: Metadata = {
  title: "accurate nursing app",
  description: "a quiz app for nurses and nclex students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
        )}
      >
        <div className="mt-2 mx-2">
          <Navbar/>

          {children}
        </div>
      </body>
    </html>
  );
}
