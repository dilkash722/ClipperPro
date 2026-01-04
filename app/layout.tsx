import "./globals.css";
import Header from "@/components/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0 overflow-x-hidden bg-background text-foreground">
        <Header />
        {children}
      </body>
    </html>
  );
}
