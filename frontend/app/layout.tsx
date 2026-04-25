import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "tinkr — terminal tools",
  description:
    "Fast, minimal developer tools. 100% private, client-side only. No accounts, no tracking.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%230c0c0c' width='100' height='100'/><text x='50' y='70' font-size='80' fill='%234ade80' text-anchor='middle' font-weight='bold'>$</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('tinkr-theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                if (theme === 'dark') {
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
