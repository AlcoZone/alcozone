import { AuthGuard } from "@/components/AuthGuard/AuthGuard";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}