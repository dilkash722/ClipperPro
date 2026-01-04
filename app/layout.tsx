import "./globals.css";
import Header from "@/components/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />

        {/* MAIN CONTENT WRAPPER */}
        <main className="mx-auto max-w-7xl px-6">{children}</main>
      </body>
    </html>
  );
}
