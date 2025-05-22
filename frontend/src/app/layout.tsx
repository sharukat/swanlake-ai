import "./globals.css";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="!scroll-smooth">
        <body>
          <Providers>
            <main className="min-h-screen flex-grow">{children}</main>
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
