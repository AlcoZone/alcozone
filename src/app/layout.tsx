import { AuthGuard } from "@/components/AuthGuard/AuthGuard";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuHidden, setMenuHidden] = useState(false);

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AuthGuard>{children}</AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
