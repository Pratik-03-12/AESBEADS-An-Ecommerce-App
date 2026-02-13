import { Toaster } from "react-hot-toast";
import { Providers } from "@/components/Providers";
import "./globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-poppins antialiased" suppressHydrationWarning>
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{ style: { background: "#000000", color: "#fff" } }}
          />
        </Providers>
      </body>
    </html>
  );
};
export default RootLayout;