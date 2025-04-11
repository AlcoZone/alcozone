// app/layout.tsx
import "./globals.css";
import Menu from "@/components/Menu/Menu";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Menu>{children}</Menu>
      </body>
    </html>
  );
}